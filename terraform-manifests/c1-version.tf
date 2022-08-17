terraform {
  required_version = "~> 1.2.7" // Checking the version via the command terraform version
  required_providers {
    aws = { // Local name provider (Should be unique)
      source  = "hashicorp/aws"
      version = "4.26.0"
    }
  }
}

provider "aws" { // Provider name is the required provider name.
  region = var.aws_region
}
