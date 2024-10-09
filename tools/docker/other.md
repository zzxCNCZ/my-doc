# docker其他操作
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

### 将容器打包成镜像
> 在正在运行的容器中加了某些配置，当需要在其他服务器部署时，不希望再重新配置镜像，此时就可以将当前容器打包，传输到目标服务器后再load即可。

```bash
# docker commit [containerId or containerName] [imageName] 
docker commit 135a0d19f757 jenkins:1.0
```
