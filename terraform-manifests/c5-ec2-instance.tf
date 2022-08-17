data "aws_availability_zones" "my_azones" {
  filter {
    name     = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

resource "aws_instance" "task_app" {
  ami                    = data.aws_ami.amzlinux2.id // this is coming from ami-datasource
  instance_type          = var.instance_type
  user_data              = file("${path.module}/app1-install.sh")
  key_name               = var.instance_keypair                                           // this is coming from variables file 
  vpc_security_group_ids = [aws_security_group.vpc-ssh.id, aws_security_group.vpc-web.id] // This info is coming from security groups
  for_each               = toset(data.aws_availability_zones.my_azones.names)             // toSet make each one of the elements has a string and same type
  availability_zone      = each.key
  tags = {
    "Name" : "EC2 Demo V1-${each.value}"
  }
}

#instance_type = var.instance_type_map["prod"] // Map
#instance_type          = var.instance_type_list[1] // List
