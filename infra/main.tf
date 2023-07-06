provider "aws" {
  region = "us-east-1" // Defina a região desejada
}


resource "aws_instance" "example" {
  ami           = "ami-0c94855ba95c71c99" // AMI do Amazon Linux 2 para a região escolhida
  instance_type = "t2.micro" // Tipo de instância desejado

  tags = {
    Name = "example-instance"
  }

  // Configuração para se conectar via SSH
  key_name      = "your-key-name" // Nome da chave SSH existente na sua conta AWS
  security_group = "your-security-group-id" // ID do grupo de segurança que permite acesso à porta 22 (SSH)
}

provisioner "remote-exec" {
  inline = [
    "sudo yum update -y",
    "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash", // Instalação do NVM
    "source ~/.bashrc",
    "nvm install --lts", // Instalação da versão LTS do Node.js
    "git clone https://github.com/Jaquelaurenti/poc-chaos-engineering.git", // URL do repositório do seu aplicativo Node.js
    "cd repository",
    "npm install", // Instalação das dependências do aplicativo
    "node app.js &" // Execução do aplicativo em segundo plano
  ]

  connection {
    type        = "ssh"
    user        = "ec2-user"
    private_key = file("~/.ssh/chave_ssh.pem") // Caminho para a chave privada SSH
    host        = aws_instance.example.public_ip // IP público da instância EC2
  }
}

