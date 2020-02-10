#!/bin/bash

BUNDLE_FILENAME="bundle-$(git rev-parse --short HEAD).zip"
cd ..
zip -r terraform/${BUNDLE_FILENAME} package.json yarn.lock .npmrc build/*
cd -
terraform apply --var-file=vars.tfvars --var "dist=$BUNDLE_FILENAME"
aws --profile armandmgt elasticbeanstalk update-environment --environment-name $(terraform output env_name) --version-label $(terraform output app_version) > /dev/null
rm ${BUNDLE_FILENAME}
