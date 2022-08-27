#/bin/sh

set -e

cd ./create_task
npm ci

cd ..
terraform apply -auto-approve