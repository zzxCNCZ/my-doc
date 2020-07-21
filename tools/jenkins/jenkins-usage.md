---
title: Jenkins基本使用
date: 2019-09-18 21:23:14
categories:
- Jenkins
- 基本使用
tags:
- Jenkins
---
### Jenkins使用

##### 使用公钥私钥连接github

```shell
ssh-keygen -t rsa -C “bluedrum@qq.com”

cat >> ~/.ssh/authorized_keys < ~/.ssh/id_rsa.pub
```
<!--more-->
##### 在docker中运行jenkins

1. 在linux上安装java，git，docker
2. 运行命令

```shell
  docker run \
  -u root \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME":/home \
  --name jenkins-zzx \
  jenkinsci/blueocean
```

##### 使用Maven构建Java应用程序

##### 在Ubuntu中直接安装jenkins

```shell
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
echo y|sudo apt-get install jenkins

```

- 遇到问题 No Java executable found in current PATH: /bin:/usr/bin:/sbin:/usr/sbin

- 解决方案：

- ```shell
  # 给/usr/bin添加	jdk软链接
  ln -s /usr/jdk1.8.0_131/bin/java /usr/bin/java
  ```

- 启动后无法访问的情况

- 解决方案：先安装openjdk，再不行的话重启服务器

- Jenkins 离线解决方案：

  ```shell
  1.访问/pluginManager/advanced 页修改
  http://updates.jenkins.io/update-center.json
  2.如果还是不行
  修改/jenkins_home/update/default.json
  其中www.google.com改为www.baidu.com
  
  ```

  

##### Ubuntu中jenkins运行命令

```shell
sudo service jenkins start|stop|restart
```

##### 卸载Jenkins

```shell
//服务
sudo apt-get remove jenkins

//安装包，注意这里如果不是ubuntu那就yum
sudo apt-get remove --auto-remove jenkins

//配置和数据
sudo apt-get purge jenkins

sudo apt-get purge --auto-remove jenkins
```

##### 将jenkins加入到docker 用户组

```shell
# 将Jenkins 加入到Docker 用户组
sudo gpasswd -a jenkins docker
# 重启进程
systemctl daemon-reload
systemctl restart docker
# 重启jenkins
service jenkins restart
```

##### 使用maven镜像问题

```shell
会导致.m2在独立的workspace下，可以通过使用本地maven来解决
安装maven插件
```

##### 运行.sh文件提示permission denied

```shell
chmod 777 test.sh
```

