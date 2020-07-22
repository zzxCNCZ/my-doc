##### 3213

```shell
ssh-keygen -t rsa -C “bluedrum@qq.com”

cat >> ~/.ssh/authorized_keys < ~/.ssh/id_rsa.pub
```
<!--more-->
##### 3213

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

##### 3213
