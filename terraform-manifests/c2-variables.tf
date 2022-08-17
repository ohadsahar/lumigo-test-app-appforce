#Configure Variables
variable "terraform_version" {
  description = "Current using terraform version"
  type        = string
  default     = "~> 1.2.7"
}

#AWS Variables
variable "aws_region" {
  description = "Region in which AWS Resource to be created"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 Instance type"
  type        = string
  default     = "t3.micro"
}


// Creating key in ec2 service
variable "instance_keypair" {
  description = "AWS EC2 Key Pair need to be associated width EC2 Instance"
  type        = string
  default     = "terraform-key"
}


// Both are for the same thing

variable "instance_type_list" {
  description = "EC2 Instance type"
  type        = list(string)
  default     = ["t3.micro", "t3.small", "t3.large"]
}

variable "instance_type_map" {
  description = "EC2 Instance type"
  type        = map(string)
  default = {
    "dev"  = "t3.micro"
    "qa"   = "t3.small"
    "prod" = "t3.large"
  }

}
