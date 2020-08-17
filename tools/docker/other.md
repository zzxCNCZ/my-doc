# 其他配置
> 容器控制
### 容器控制
```shell script
# 查看内存占用
docker stats

# 删除 none 镜像 
docker rmi $(docker images | grep "none" | awk '{print $3}')

#查询所有的容器，过滤出Exited状态的容器，列出容器ID，删除这些容器
sudo docker rm `docker ps -a|grep Exited|awk '{print $1}'`

#根据容器的状态，删除Exited状态的容器
sudo docker rm $(sudo docker ps -qf status=exited)

# 停止所有容器
docker stop $(docker ps -aq)
```
