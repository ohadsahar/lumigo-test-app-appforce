resource "aws_s3_bucket" "lambdas_bucket" {
  bucket        = var.lambdas_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "lambdas_bucket" {
  bucket                  = aws_s3_bucket.lambdas_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
