resource "aws_apigatewayv2_integration" "update_task_lambda" {
  api_id             = aws_apigatewayv2_api.task_app_main.id
  integration_uri    = aws_lambda_function.update_task.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "update_the_task" {
  api_id    = aws_apigatewayv2_api.task_app_main.id
  route_key = "PUT /update_task"
  target    = "integrations/${aws_apigatewayv2_integration.update_task_lambda.id}"
}

resource "aws_lambda_permission" "api_gw_v5" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.update_task.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.task_app_main.execution_arn}/*/*"
}

output "update_task_base_url" {
  value = aws_apigatewayv2_stage.dev.invoke_url
}
