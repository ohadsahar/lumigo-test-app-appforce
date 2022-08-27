resource "aws_iam_role" "get_tasks_lambda_exec" {
  name               = "get-tasks-lambda"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "get_tasks_lambda_policy" {
  role       = aws_iam_role.get_tasks_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


resource "aws_iam_role_policy_attachment" "get_tasks_lambda_policy_access" {
  role       = aws_iam_role.get_tasks_lambda_exec.name
  policy_arn = aws_iam_policy.dynamo_db_full_access_policy.arn
}

resource "aws_lambda_function" "get_tasks" {
  timeout          = 10
  function_name    = "get_tasks"
  s3_bucket        = aws_s3_bucket.lambdas_bucket.id
  s3_key           = aws_s3_object.get_tasks_lambda.key
  runtime          = "nodejs16.x"
  handler          = "get_tasks.handler"
  source_code_hash = data.archive_file.get_tasks_lambda.output_base64sha256
  role             = aws_iam_role.get_tasks_lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "get_tasks" {
  name              = "/aws/lambda/${aws_lambda_function.get_tasks.function_name}"
  retention_in_days = 14
}

data "archive_file" "get_tasks_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/get_tasks"
  output_path = "${path.module}/get_tasks.zip"
}

resource "aws_s3_object" "get_tasks_lambda" {
  bucket = aws_s3_bucket.lambdas_bucket.id
  key    = "get_tasks.zip"
  source = data.archive_file.get_tasks_lambda.output_path
  etag   = filemd5(data.archive_file.get_tasks_lambda.output_path)
}
