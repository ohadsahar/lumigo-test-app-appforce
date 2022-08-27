resource "aws_iam_role" "delete_task_lambda_exec" {
  name               = "delete-task-lambda"
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

resource "aws_iam_role_policy_attachment" "delete_task_lambda_policy" {
  role       = aws_iam_role.delete_task_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


resource "aws_iam_role_policy_attachment" "delete_task_lambda_policy_access" {
  role       = aws_iam_role.delete_task_lambda_exec.name
  policy_arn = aws_iam_policy.dynamo_db_full_access_policy.arn
}

resource "aws_lambda_function" "delete_task" {
  timeout          = 10
  function_name    = "delete_task"
  s3_bucket        = aws_s3_bucket.lambdas_bucket.id
  s3_key           = aws_s3_object.delete_task_lambda.key
  runtime          = "nodejs16.x"
  handler          = "delete_task.handler"
  source_code_hash = data.archive_file.delete_task_lambda.output_base64sha256
  role             = aws_iam_role.delete_task_lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "delete_task" {
  name              = "/aws/lambda/${aws_lambda_function.delete_task.function_name}"
  retention_in_days = 14
}

data "archive_file" "delete_task_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/delete_task"
  output_path = "${path.module}/delete_task.zip"
}

resource "aws_s3_object" "delete_task_lambda" {
  bucket = aws_s3_bucket.lambdas_bucket.id
  key    = "delete_task.zip"
  source = data.archive_file.delete_task_lambda.output_path
  etag   = filemd5(data.archive_file.delete_task_lambda.output_path)
}
