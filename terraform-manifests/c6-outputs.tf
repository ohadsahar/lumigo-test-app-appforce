#no count

/*
output "instance_publicip" {
  description = "EC2 Instance Public IP"
  value       = aws_instance.task_app.public_ip
}
*/

/*
 output "instance_publicdns" {
   description = "EC2 Instance Public DNS"
   value       = aws_instance.task_app.public_dns
 }
 */

output "for_output_list" {
  description = "For loop with list"
  value       = [for instance in aws_instance.task_app : instance.public_dns]
}

output "for_output_map" {
  description = "For loop with map"
  value       = { for instance in aws_instance.task_app : instance.id => instance.public_dns } // instance.id =  key, instance... => value
}

output "for_output_map2" {
  description = "For loop with map advanced"
  value       = { for c, instance in aws_instance.task_app : c => instance.public_dns } // print for each index is own public dns
}

output "legacy_splat_instance_publicdns" {
  description = "Legacy Splat operator"
  #value       = aws_instance.task_app.*.public_dns // the * is for the count 
  value = toset([for instance in aws_instance.task_app : instance.public_ip])
}

output "latest_splat_instance_publicdns" {
  description = "Generliezd latest Splat operator"
  #value       = aws_instance.task_app[*].public_dns // the * is for the count 
  value = toset([for instance in aws_instance.task_app : instance.public_dns])
}


