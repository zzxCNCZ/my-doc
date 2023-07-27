# kafka基本设置

## 安装
**使用docker-compose安装**, 使用的是 [kafka bitnami镜像](https://hub.docker.com/r/bitnami/kafka/) ，相比起官方文档镜像易用性更高。
```docker
version: "2"

services:
  zookeeper:
    container_name: zookeeper     
    image: docker.io/bitnami/zookeeper:3.8
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    container_name: kafka       
    image: docker.io/bitnami/kafka:3.2
    ports:
      #- "9092:9092"
      - "9093:9093"
    volumes:
      - "kafka_data:/bitnami"
    environment:
      - KAFKA_BROKER_ID=1   
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://0.0.0.0:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://kafka:9092,EXTERNAL://192.168.1.127:9093
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=CLIENT
    depends_on:
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local
```
以上docker-compose.yml 配置了提供 EXTERNAL 访问方式，对外暴露的端口为9093。设置`KAFKA_BROKER_ID`为 1(如果配置了kafka集群，
注意要设置唯一的broker_id)。数据存储使用的volume的方式，如果要使用bind方式，修改volume为指定目录。

## 安全设置
使用SASL(Simple Authentication Security Layer )认证
```docker
version: "2"

services:
  zookeeper:
    container_name: zookeeper     
    image: docker.io/bitnami/zookeeper:3.8
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
      - /etc/localtime:/etc/localtime
    environment:
      # zookeeper开启认证
      - ZOO_ENABLE_AUTH=yes
      - ZOO_CLIENT_USER=kafka
      - ZOO_CLIENT_PASSWORD=password
      - ZOO_SERVER_USERS=grandlynn
      - ZOO_SERVER_PASSWORDS=grandlynn
  kafka:
    container_name: kafka       
    image: docker.io/bitnami/kafka:3.2
    ports:
      - "9092:9092"
      - "9093:9093"
    volumes:
      # 挂载配置文件, 认证配置文件
      - ./conf/kafka_jaas.conf:/opt/bitnami/kafka/config/kafka_jaas.conf
      # kafka工具配置文件 for kafka-topics.sh
      - ./conf/config.properties:/opt/bitnami/kafka/config/config.properties
      # 同步容器时间
      - /etc/localtime:/etc/localtime
    environment:
      - BITNAMI_DEBUG=true
      - KAFKA_BROKER_ID=1   
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      # 开启SASL认证
      - KAFKA_CFG_SASL_ENABLED_MECHANISMS=PLAIN
      - KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL=PLAIN
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:SASL_PLAINTEXT,EXTERNAL:SASL_PLAINTEXT
      # 监听的网卡及端口 //:9092代表监听所有网卡的9092端口
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://:9093
      # advertised.listeners 为客户端访问的地址和注册到zookeeper的地址
      # 格式为 外部ip:外部port   
      # e.g. 映射端口为 19093:9093  外部ip 100.10.1.1  则配置为：EXTERNAL://100.10.1.1:19093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://192.168.1.127:9092,EXTERNAL://47.111.1.120:9093
      # 集群间通讯使用的 listener
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=CLIENT
      # 配置SASL认证的用户名和密码
      - KAFKA_OPTS=-Djava.security.auth.login.config=/opt/bitnami/kafka/config/kafka_jaas.conf
      # kafka 连接 zookeeper账户，使用sasl认证
      - KAFKA_ZOOKEEPER_PROTOCOL=SASL
      - KAFKA_ZOOKEEPER_USER=grandlynn
      - KAFKA_ZOOKEEPER_PASSWORD=grandlynn
    depends_on:
      - zookeeper

# docker volume方式持久化数据
volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local

```
**kafka_jaas.conf 配置如下：**
```bash
# sername和password是broker用于初始化连接到其他的broker 在下面配置中，admin用户为broker间的通讯，user_userName定义了所有连接到broker和broker验证的所有的客户端连接，包括其他broker的用户密码，user_userName必须配置admin用户，否则会报错
KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    user_admin="admin"
    user_alice="alice";
};
# 以上配置也可以写成下面的形式
# username="admin" password="admin"; username="alice" password="alice

# username和password是客户端用来配置客户端连接broker的用户，在下面配置中，客户端使用alice用户连接到broker
KafkaClient {
 	org.apache.kafka.common.security.plain.PlainLoginModule required
	username="alice"
	password="alice";
};

# used for zookeeper connection, 经过测试可以不配置，若配置需要填写正确的用户名和密码
Client {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="grandlynn"
    password="grandlynn";
};

```

**config.properties 配置如下：**

> 该配置文件是为了给容器内的kafka tools认证使用的，如果不需要使用kafka tools，可以不配置
```bash
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="grandlynn" password="grandlynn_kafka";
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
```
- 列出所有topic
```bash
kafka-topics.sh --list --bootstrap-server 192.168.1.127:9092 --command-config /opt/bitnami/kafka/config/config.properties

```
- 创建topic
```bash
kafka-topics.sh --create  --bootstrap-server 192.168.1.127:9092 --replication-factor 2  --partitions 2 --topic TestTopic --command-config /opt/bitnami/kafka/config/config.properties
```


*以上配置中KafkaServer 和 KafkaClient都配置了alice用户，因此在springboot项目中，使用PLAIN 认证时，填写该用户即可。*

### 集群配置
以上例子使用zooKeeper作为集群管理，因此如果需要配置集群，只需要讲新的kafka注册到zooKeeper即可。
e.g. 新增一个kafka节点，配置如下：
ip: 192.168.1.102

```docker-compose
version: "2"

services:
  kafka:
    container_name: kafka
    image: docker.io/bitnami/kafka:3.2
    ports:
      - "9092:9092"
      - "9093:9093"
    volumes:
      - ./conf/kafka_jaas.conf:/opt/bitnami/kafka/config/kafka_jaas.conf
      - ./data:/bitnami/kafka
    environment:
      - KAFKA_BROKER_ID=2
      - KAFKA_CFG_NODE_ID=2
      - KAFKA_ENABLE_KRAFT=no
      - KAFKA_CFG_ZOOKEEPER_CONNECT=192.168.1.127:2181
      - KAFKA_CFG_SASL_ENABLED_MECHANISMS=PLAIN
      - KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL=PLAIN
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:SASL_PLAINTEXT,EXTERNAL:SASL_PLAINTEXT,EXTERNAL_VPN:SASL_PLAINTEXT
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://0.0.0.0:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://192.168.1.102:9092,EXTERNAL://192.168.1.102:9093
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=CLIENT
      - KAFKA_OPTS=-Djava.security.auth.login.config=/opt/bitnami/kafka/config/kafka_jaas.conf
      - KAFKA_ZOOKEEPER_PROTOCOL=SASL
      - KAFKA_ZOOKEEPER_USER=grandlynn
      - KAFKA_ZOOKEEPER_PASSWORD=grandlynn

```
启动后，会自动接入到zooKeeper集群中。要注意的是，新加入的节点需要配置唯一的broker_id，否则会报错。
使用的是SASL_PLAINTEXT 认证，因此kafka_jaas.conf文件需要与其他节点保持一致。



**问题及解决方案**
1. 当使用 本地目录的挂载方式时，需要注意文件夹UID需要设置为1001
> As this is a non-root container, the mounted files and directories must have the proper permissions for the UID 1001

[persisting-your-data](https://github.com/bitnami/bitnami-docker-kafka#persisting-your-data)

方式:
```bash
mkdir kafka_data

chown -R 1001:1001 kafka_data
```

2. 重启容器时，kafka启动失败报错: `org.apache.zookeeper.KeeperException$NodeExistsException: KeeperErrorCode = NodeExists`

[github issue](https://github.com/wurstmeister/kafka-docker/issues/389)

```
The error message means that there is an ephemeral connection to the znode that has not been closed. e.g. you have restarted kafka but zookeeper has not detected the old, now stopped kafka has closed it's connection.

This should not happen on the first time you create containers from the docker-compose file. Please make sure you are starting with a clean environment, i.e. docker-compose rm -svf.

If you want better persistence handling across restarts, make sure you configure broker ID and logs dir etc. However, this is a more advanced topic which requires a more in-depth knowledge of how Kafka is configured - please refer to the official documentation for full information.
 
```
简单的解决方式是，待zookeeper启动后，再手动启动kafka。或者设置参数：
```docker
restart: always
```

### spring boot 集成 sasl认证
```yaml
  kafka:
    bootstrap-servers: 192.168.1.127:9093
    properties:
      security.protocol: SASL_PLAINTEXT
      sasl.mechanism: PLAIN
      sasl.jaas.config: org.apache.kafka.common.security.plain.PlainLoginModule required username="alice" password="alice";
```

## 数据可视化
kafka默认是没有管理页面的，因此数据管理不是很方便，需要使用第三方工具进行数据可视化。 

[kafka tool](https://www.kafkatool.com/)
