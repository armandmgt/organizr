provider "aws" {
  profile = "armandmgt"
  region = "eu-west-3"
}

variable "dist" {
  description = "The code to be distributed on the machine"
}

variable "namespace" {
  description = "The namespace to use for the resources"
}

variable "environment" {
  description = "The name of the elb environment"
}

variable "instance_public_key" {
  description = "The public key used to access the instance"
}

resource "aws_key_pair" "instance_key" {
  key_name_prefix = "${var.namespace}"
  public_key = "${var.instance_public_key}"
}

resource "aws_s3_bucket" "dist_bucket" {
  bucket = "${var.namespace}-dist"
  acl = "private"
}

resource "aws_s3_bucket_object" "dist_item" {
  key = "${var.environment}/${var.dist}"
  bucket = "${aws_s3_bucket.dist_bucket.id}"
  source = "${path.root}/${var.dist}"
}

resource "aws_elastic_beanstalk_application" "organizr" {
  name = "organizr"
}

resource "aws_elastic_beanstalk_application_version" "default" {
  name = "${var.namespace}-${var.environment}-${uuid()}"
  application = "${aws_elastic_beanstalk_application.organizr.name}"
  description = "application version created by terraform"
  bucket = "${aws_s3_bucket.dist_bucket.id}"
  key = "${aws_s3_bucket_object.dist_item.id}"
}

data "aws_iam_policy_document" "beanstalk_assume_role" {
  statement {
    effect = "Allow"
    principals {
      identifiers = ["ec2.amazonaws.com"]
      type = "Service"
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "web" {
  name               = "organizr-beanstalk"
  assume_role_policy = "${data.aws_iam_policy_document.beanstalk_assume_role.json}"
}

resource "aws_iam_role_policy_attachment" "web_tier" {
  role       = "${aws_iam_role.web.id}"
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_instance_profile" "web" {
  depends_on = ["aws_iam_role_policy_attachment.web_tier"]
  name       = "organizr-beanstalk"
  role       = "${aws_iam_role.web.name}"
}

data "aws_iam_role" "service_role" {
  name = "AWSServiceRoleForElasticBeanstalk"
}

resource "aws_elastic_beanstalk_environment" "organizr" {
  application = "organizr"
  name = "orgnaizr-dev"
  solution_stack_name = "64bit Amazon Linux 2018.03 v4.12.0 running Node.js"

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = "${data.aws_iam_role.service_role.name}"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "${aws_iam_instance_profile.web.name}"
  }
}

output "app_version" {
  value = "${aws_elastic_beanstalk_application_version.default.name}"
}

output "env_name" {
  value = "${aws_elastic_beanstalk_environment.organizr.name}"
}
