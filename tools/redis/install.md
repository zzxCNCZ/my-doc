# Redis docker install

1. 拉取redis镜像
```
docker pull redis  // 拉取最新的redis镜像
```
2. 创建redis目录(存放redis相关数据，否则容器重启后数据会丢失)
```
mkdir -p ~/redis ~/redis/data
```
3. 启动redis
```
docker run  --name main-redis -v $PWD/data:/data    -d -p 6379:6379 redis redis-server --appendonly yes --requirepass "password"
```
- 参数说明
```
 --name main-redis  : 容器别名 
 -p 6379:6379 : 将容器的6379端口映射到主机的6379端口

 -d : 将容器的在后台运行

 -v $PWD/data:/data : 将主机中当前目录下的data挂载到容器的/data .redis数据卷,如未加上这个,容器重启后数据将丢失.

 redis-server --appendonly yes : 在容器执行redis-server启动命令，并打开redis持久化配置

  --requirepass "ReDis@.1*1PWD"  设置引号里字符为密码

 –restart=always : 随docker启动而启动

```

## Redis docker-compose 
```bash
# docker-compose.yml
version: '3'
services:
  redis:
    image: redis
    container_name: redis
    restart: always
    ports:
      - 6379:6379
    volumes:
#  mount redis.conf
#      - ./redis.conf:/usr/local/etc/redis/redis.conf    
      - ./data:/data
    command: redis-server --appendonly yes --requirepass "password"
#    use this command if you want to use redis.conf    
#    command: redis-server /usr/local/etc/redis/redis.conf --appendonly yes

```

```bash
# 启动
docker-compose up -d

```