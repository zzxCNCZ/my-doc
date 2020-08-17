# 安装及配置
> docker 安装及镜像加速配置

#### 安装
```shell script
wget -qO- https://get.docker.com/ | sh
# 非root用户使用
sudo usermod -aG docker +用户名
newgrp docker     #更新用户组
```

### 镜像加速
```shell script

# 切换国内镜像
vim /etc/default/docker 
# 添加
DOCKER_OPTS="–registry-mirror=https://registry.docker-cn.com"
# 重启
service docker restart
# 或者
阿里云容器  服务
https://cr.console.aliyun.com/
首页点击 "创建我的容器镜像" 得到一个专属的镜像加速地址,类似于"https://1234abcd.mirror.aliyuncs.com"
# 到镜像加速器
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://kt5y1m25.mirror.aliyuncs.com"]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker

```
