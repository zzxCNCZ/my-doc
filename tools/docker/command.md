# 基本命令
> 基本命令

```shell script
 # 搜索公共仓库镜像
docker search

 #下载镜像到本地
docker pull 'imageName'

docker images # 查看docker镜像

docker image rm # 删除镜像 -f 强制删除

docker ps  # 查看容器运行  -a查看所有容器

docker stop #停止容器

docker start #启动容器

docker restart #重启容器

docker logs +容器id  #查看容器运行日志

docker exec -it  容器id bash   #进入docker

# 退出容器  
ctrl+D

# 容器自启，使用--restart参数来设置
--restart=always   

# 查看容器挂载目录
docker inspect redis-master | grep Mounts -A 10

docker inspect -f "{{.Mounts}}" mysql

# 挂载
-v [host-dir]:[container-dir]:[rw|wo]

host-dir:表示主机上的目录,如果不存在,Docker 会自动在主机上创建该目录.
container-dir:表示容器内部对应的目录,如果该目录不存在,Docker 也会在容器内部创建该目录.
rw|ro:用于控制卷的读写权限.

#  查看docker信息
docer inspect containerId

# 查看docker volume (/var/lib/docker/volumes/)
docker volume ls  

# 拷贝
docker cp  本地文件  container-id:path 复制文件

exp:docker cp sbmysql.war 1dde5b08d489:/usr/local/tomcat/webapps

# 更新容器参数
# 如果创建时未指定 --restart=always ,可通过update 命令设置
docker update --restart=always xxx
# 还可以在使用on - failure策略时，指定Docker将尝试重新启动容器的最大次数。默认情况下，Docker将尝试永远重新启动容器。
docker run --restart=on-failure:10 redis 
```
