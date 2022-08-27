variable "aws_region" {
  description = "Region in which AWS Resources to be created"
  type        = string
  default     = "us-east-1"
}

variable "lambdas_bucket_name" {
  description = "S3 Bucket name"
  type        = string
  default     = "task-app-lambdas"
}
