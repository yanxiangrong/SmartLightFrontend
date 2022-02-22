apt update
apt install curl -y

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh --mirror Aliyun

systemctl daemon-reload
systemctl enable docker
systemctl start docker

curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://kxfrmcpz.mirror.aliyuncs.com", "http://hub-mirror.c.163.com"]
}
EOF

mkdir ./log
mkdir ./log/web
mkdir ./build

docker-compose up -d
