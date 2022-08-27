resource "aws_apigatewayv2_integration" "create_task_lambda" {
  api_id             = aws_apigatewayv2_api.task_app_main.id
  integration_uri    = aws_lambda_function.create_task.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "post_task" {
  api_id    = aws_apigatewayv2_api.task_app_main.id
  route_key = "POST /create_task"
  target    = "integrations/${aws_apigatewayv2_integration.create_task_lambda.id}"
}

resource "aws_lambda_permission" "api_gw_v3" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_task.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.task_app_main.execution_arn}/*/*"
}

output "create_task_base_url" {
  value = aws_apigatewayv2_stage.dev.invoke_url
}
