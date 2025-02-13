# docker安装及配置
> docker 安装及镜像、加速配置、根目录配置

## 在线安装
```shell script
wget -qO- https://get.docker.com/ | sh
# 非root用户使用
sudo usermod -aG docker +用户名
newgrp docker     #更新用户组
```

## 离线安装
1. 下载地址, 下载对应版本
`https://download.docker.com/linux/static/stable/x86_64/`
2. 配置docker service
```bash
vim docker.service

docker.service

[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP $MAINPID
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
# Uncomment TasksMax if your systemd version supports it.
# Only systemd 226 and above support this version.
#TasksMax=infinity
TimeoutStartSec=0
# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes
# kill only the docker process, not all processes in the cgroup
KillMode=process
# restart the docker process if it exits prematurely
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target

```
3. 安装脚本 install.sh
```shell
vim install.sh

#!/bin/sh
echo '解压tar包...'
sudo tar -xvf $1
echo '将docker目录移到/usr/bin目录下...'
sudo cp docker/* /usr/bin/
echo '将docker.service 移到/etc/systemd/system/ 目录...'
sudo cp docker.service /etc/systemd/system/
echo '添加文件权限...'
sudo chmod +x /etc/systemd/system/docker.service
echo '重新加载配置文件...'
sudo systemctl daemon-reload
echo '启动docker...'
sudo systemctl start docker
echo '设置开机自启...'
sudo systemctl enable docker.service
echo 'docker安装成功...'
docker -v

```
4. 卸载脚本
```shell script
vim uninstall.sh


#!/bin/sh
echo '删除docker.service...'
sudo rm -f /etc/systemd/system/docker.service
echo '删除docker文件...'
sudo rm -rf /usr/bin/docker*
echo '重新加载配置文件'
sudo systemctl daemon-reload
echo '卸载成功...'

```

## 镜像加速
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

## 配置docker镜像源及日志限制
```bash
sudo vim /etc/docker/daemon.json

# 内容如下 ：
{
    "registry-mirrors":
    [
        "https://docker.940303.xyz"
    ],
    "insecure-registry":
    [
        "docker.940303.xyz"
    ],
    "log-driver": "json-file",
    "log-opts":
    {
        "max-size": "100m",
        "max-file": "3"
    }
}

```
## 设置镜像拉取代理
```bash
# 如果没有目录需要新建目录
# sudo mkdir -p /etc/systemd/system/docker.service.d/

# 编辑 /etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://your.proxy.server:port/"
Environment="HTTPS_PROXY=https://your.proxy.server:port/"
Environment="NO_PROXY=localhost,127.0.0.1"

# 重启docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## docker根目录迁移
> 迁移前先关闭docker  service docker stop, 使用rsync 迁移 /var/lib/docker(docker默认目录)目录
```shell script
# 编辑docker daemon.json 
vim /etc/docker/daemon.json

# 加入配置
"data-root": "/new-path/docker"

# 最终配置
cat /etc/docker/daemon.json
# 如下
{
  "registry-mirrors": ["https://kt5y1m25.mirror.aliyuncs.com"], "data-root": "/new-path/docker"
}

sudo systemctl daemon-reload
sudo systemctl restart docker
```

## snap版本docker镜像加速
```bash
$ vim /var/snap/docker/current/config/daemon.json
# 添加
"registry-mirrors": ["https://hub-mirror.c.163.com"]

$ cat /var/snap/docker/current/config/daemon.json
{
    "log-level":        "error",
    "storage-driver":   "overlay2",
    "registry-mirrors": ["https://hub-mirror.c.163.com"]
}

# 重启docker
snap restart docker

# 通过docker info 产看是否生效
```

## docker容器目录迁移
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
