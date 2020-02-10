#!/bin/bash

BUNDLE_FILENAME="bundle-$(git rev-parse --short HEAD).zip"
pushd ..
zip -r terraform/${BUNDLE_FILENAME} package.json yarn.lock .npmrc
pushd build
zip -ur ../terraform/${BUNDLE_FILENAME} *
popd
popd
terraform apply --var-file=vars.tfvars --var "dist=$BUNDLE_FILENAME"
aws --profile armandmgt elasticbeanstalk update-environment --environment-name $(terraform output env_name) --version-label $(terraform output app_version) > /dev/null
rm ${BUNDLE_FILENAME}
