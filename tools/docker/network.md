# docker网络设置
> 网络设置
```shell script
# 查看网络
docker network ls
# 新建网络
docker network create my-net
or  docker network create --subnet=172.18.0.0/16 mynetwork
# 将容器加入网络
docker network connect my-net tomcat
docker network connect my-net mysql
# 查看网络信息
docker network inspect my-net 
# 容器绑定ip 参数
--net mynetwork --ip 172.18.0.2

# 清理网络
docker network prune
```

## docker network command
```yaml
Commands:
  connect     Connect a container to a network
  create      Create a network
  disconnect  Disconnect a container from a network
  inspect     Display detailed information on one or more networks
  ls          List networks
  prune       Remove all unused networks
  rm          Remove one or more networks
```
