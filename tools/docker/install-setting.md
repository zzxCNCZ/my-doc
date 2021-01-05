# docker安装及配置
> docker 安装及镜像、加速配置、根目录配置

#### docker安装
```shell script
wget -qO- https://get.docker.com/ | sh
# 非root用户使用
sudo usermod -aG docker +用户名
newgrp docker     #更新用户组
```

### docker镜像加速
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

### docker容器目录迁移
> 迁移前先关闭docker  service docker stop, 使用rsync 迁移 /var/lib/docker(docker默认目录)目录
```shell script
# 编辑docker daemon.json 
vim /etc/docker/daemon.json

# 加入配置
"graph": "/new-path/docker"

# 最终配置
cat /etc/docker/daemon.json
# 如下
{
  "registry-mirrors": ["https://kt5y1m25.mirror.aliyuncs.com"], "graph": "/new-path/docker"
}

sudo systemctl daemon-reload
sudo systemctl restart docker
```
