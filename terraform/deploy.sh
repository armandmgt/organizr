#!/bin/bash
terraform apply --var-file=vars.tfvars
aws --profile armandmgt elasticbeanstalk update-environment --environment-name $(terraform output env_name) --version-label $(terraform output app_version)
