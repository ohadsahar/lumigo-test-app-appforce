resource "aws_apigatewayv2_integration" "get_tasks_lambda" {
  api_id             = aws_apigatewayv2_api.task_app_main.id
  integration_uri    = aws_lambda_function.get_tasks.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "get_the_tasks" {
  api_id    = aws_apigatewayv2_api.task_app_main.id
  route_key = "GET /get_tasks/{type}"
  target    = "integrations/${aws_apigatewayv2_integration.get_tasks_lambda.id}"
}

resource "aws_lambda_permission" "api_gw_v4" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_tasks.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.task_app_main.execution_arn}/*/*"
}

output "get_tasks_base_url" {
  value = aws_apigatewayv2_stage.dev.invoke_url
}
