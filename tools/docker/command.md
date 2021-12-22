# docker基本命令
> docker基本命令
## docker容器常用命令
# 查看容器运行  -a查看所有容器
docker ps 
```bash
# 查看指定显示的模板
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}"

docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}\t{{.Status}}"

# 可用占位符
.ID	容器ID
.Image	镜像ID
.Command	执行的命令
.CreatedAt	容器创建时间
.RunningFor	运行时长
.Ports	暴露的端口
.Status	容器状态
.Names	容器名称
.Label	分配给容器的所有标签
.Mounts	容器挂载的卷
.Networks	容器所用的网络名称

# 显示完整信息
docker ps -a --no-trunc
```
# 停止容器
docker stop 

# 启动容器
docker start 

# 重启容器
docker restart 

# 查看容器运行日志
docker logs +容器id  

# 进入docker容器内部  并运行bash
docker exec -it  容器id bash   

# 退出容器  
ctrl+D

# 容器自启，使用--restart参数来设置
--restart=always   

#  查看docker容器信息
docer inspect containerId
```

## docker镜像常用命令
```shell script
 # 搜索公共仓库镜像
docker search

# 下载镜像到本地
docker pull 'imageName'


# 查看docker镜像
docker images 

# 删除镜像 -f 强制删除
docker image rm 

```
## docker 文件操作命令
```bash

# 查看容器挂载目录
docker inspect redis-master | grep Mounts -A 10

docker inspect -f "{{.Mounts}}" mysql

# 挂载
-v [host-dir]:[container-dir]:[rw|wo]

host-dir:表示主机上的目录,如果不存在,Docker 会自动在主机上创建该目录.
container-dir:表示容器内部对应的目录,如果该目录不存在,Docker 也会在容器内部创建该目录.
rw|ro:用于控制卷的读写权限.

# 查看docker volume (/var/lib/docker/volumes/)
docker volume ls  

# 拷贝
docker cp  本地文件  container-id:path 复制文件

e.g.,docker cp sbmysql.war 1dde5b08d489:/usr/local/tomcat/webapps

```
## docker 其他命令
```bash
# 更新容器参数
# 如果创建时未指定 --restart=always ,可通过update 命令设置
docker update --restart=always xxx
# 还可以在使用on - failure策略时，指定Docker将尝试重新启动容器的最大次数。默认情况下，Docker将尝试永远重新启动容器。
docker run --restart=on-failure:10 redis 
```

## docker镜像导出及导入（export、import、save、load）
- export 和 import
> 这两个命令是通过容器来导入、导出镜像。
1. export 导出镜像
使用 docker export 命令根据容器 ID 将镜像导出成一个文件。
```shell script
docker export f299f501774c > test_server.tar
```
2. import 导入镜像
```shell script
docker import - new_test_server < test_server.tar
```
- save 和 load
> 这两个命令是通过镜像来保存、加载镜像文件的。
1. save 保存镜像
```shell script
# 根据镜像id保存
docker save 0fdf2b4c26d3 > test_server.tar
# 根据名称及版本号保存，可以将多个镜像保存至一个压缩包
docker save -o images.tar postgres:9.6 mongo:3.4
```
2. load 载入镜像
```shell script
docker load < test_server.tar
# 或
docker load -i test_server.tar
```
- 两种方案的差别
> 特别注意：两种方法不可混用。
  如果使用 import 导入 save 产生的文件，虽然导入不提示错误，但是启动容器时会提示失败，会出现类似"docker: Error response from daemon: Container command not found or does not exist"的错误。
- 文件大小不同
export 导出的镜像文件体积小于 save 保存的镜像
- 是否可以对镜像重命名
docker import 可以为镜像指定新名称
docker load 不能对载入的镜像重命名

- 是否可以同时将多个镜像打包到一个文件中
docker export 不支持
docker save 支持

- 是否包含镜像历史
export 导出（import 导入）是根据容器拿到的镜像，再导入时会丢失镜像所有的历史记录和元数据信息（即仅保存容器当时的快照状态），所以无法进行回滚操作。
而 save 保存（load 加载）的镜像，没有丢失镜像的历史，可以回滚到之前的层（layer）。

- 应用场景不同
docker export 的应用场景：主要用来制作基础镜像，比如我们从一个 ubuntu 镜像启动一个容器，然后安装一些软件和进行一些设置后，使用 docker export 保存为一个基础镜像。然后，把这个镜像分发给其他人使用，比如作为基础的开发环境。
docker save 的应用场景：如果我们的应用是使用 docker-compose.yml 编排的多个镜像组合，但我们要部署的客户服务器并不能连外网。这时就可以使用 docker save 将用到的镜像打个包，然后拷贝到客户服务器上使用 docker load 载入。

## docker容器占用及清理
```shell script
# 查看docker信息
docker info

# 清理不在运行的container images
docker system prune -a
# 清理不使用的docker image
docker image prune --all
```
