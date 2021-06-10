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
```
