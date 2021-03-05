# docker-compose 常用设置

## docker-compose端口 ports
```shell script
ports:
  - "80:80"         # 绑定容器的80端口到主机的80端口
  - "9000:80"       # 绑定容器的80端口到主机的9000端口
  - "443"           # 绑定容器的443端口到主机的任意端口，容器启动时随机分配绑定的主机端口号
```
端口映射可使用-p、-P来实现：

-p指定要映射的端口，一个指定端口上只可以绑定一个容器
-P将容器内部开放的网络端口随机映射到宿主机的一个端口上
实际中控制container与host之间端口映射的是docker run的-p 参数，Dockerfile中是否声明了EXPOSE影响的是-P这个参数。 所以，没有声明EXPOSE端口的情况下使用-p是有效的

## 限制容器日志大小
```shell script
logging:
    options:
      max-size: 10m
```

## 设置jvm内存
```shell script
environment:
      JAVA_OPTS: "-Xms256m -Xmx1024m  -XX:MaxNewSize=256m"
```

## 设置host 并使用环境变量
```shell
vim .env

# define application env
HOST=mdm.com:10.35.160.133

# yml文件使用
extra_hosts:
  - ${HOST}
```

## docker-compose 使用args变量并让Dockerfile使用
```shell
vim .env

# define application env
MINIO_SERVER=http://10.35.160.134:9000

# yml文件使用 env的环境变量，并在build docker镜像时以args参数传入 file文件夹的Dockerfile文件中
    build:
      context: ../file
      args:
        MINIO_SERVER: ${MINIO_SERVER}

# Dockerfile 文件使用参数如下
ARG MINIO_SERVER

ENV MINIO_SERVER ${MINIO_SERVER}

CMD java -Djava.security.egd=file:/dev/./urandomi -Dminio.endpoint=${MINIO_SERVER} -jar file.jar


```
