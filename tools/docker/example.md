# Example
> 启动例子, 部分容器设置

### tomcat
```shell script
docker run -d  -p  8081:8080 tomcat  #运行命令
--restart=always
-d  后台运行
-p 8081:8080  #指定端口  本地端口:容器端口
-v 挂载目录 /usr/docker_file/NginxDemo.war:/usr/local/tomcat/webapps/NginxDemo.war    # 本地目录：容器目录
```

### linux-dash
```shell script
docker pull imightbebob/linux-dash:x86
docker run -d -p 8081:8080 --name=linux-dash imightbebob/linux-dash:x86
```

### xware
```shell script
docker run -d --name=xware -v /media/share/thunder/download:/xware/TDDOWNLOAD --restart=always --net=host caiguai/docker-xware

```

### rabbitmq
```shell script
docker run -d  -p 18672:15672 -p 8672:5672 --name rabbitmq -e RABBITMQ_DEFAULT_USER=grandlynn -e RABBITMQ_DEFAULT_PASS=grandlynn-rabbitmq rabbitmq:management

```

### gitlab
```shell script
# 刷新权限
docker exec -it gitlab update-permissions

# gitlab内存占用过大问题
# 修改 /etc/gitlab/gitlab.rb 文件，修改unicorn配置

puma['enable'] = false
unicorn['enable'] = true

# worker_processes为cpu核心数+1
unicorn['worker_processes'] = 3
unicorn['worker_timeout'] = 60
```
