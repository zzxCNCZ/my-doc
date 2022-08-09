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
      - "9093:9093"
    volumes:
      # 挂载配置文件
      - ./conf/kafka_jaas.conf:/opt/bitnami/kafka/config/kafka_jaas.conf
    environment:
      - BITNAMI_DEBUG=true
      - KAFKA_BROKER_ID=1   
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      # 开启SASL认证
      - KAFKA_CFG_SASL_ENABLED_MECHANISMS=PLAIN
      - KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL=PLAIN
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:SASL_PLAINTEXT,EXTERNAL:SASL_PLAINTEXT
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://0.0.0.0:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://kafka:9092,EXTERNAL://192.168.1.127:9093
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=CLIENT
      # 配置SASL认证的用户名和密码
      - KAFKA_OPTS=-Djava.security.auth.login.config=/opt/bitnami/kafka/config/kafka_jaas.conf
      # kafka 连接 zookeeper账户，使用sasl认证
      - KAFKA_ZOOKEEPER_PROTOCOL=SASL
      - KAFKA_ZOOKEEPER_USER=grandlynn
      - KAFKA_ZOOKEEPER_PASSWORD=grandlynn
    depends_on:
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local

```
kafka_jaas.conf 配置如下：
```
# sername和password是broker用于初始化连接到其他的broker 在下面配置中，admin用户为broker间的通讯，user_userName定义了所有连接到broker和broker验证的所有的客户端连接，包括其他broker的用户密码，user_userName必须配置admin用户，否则会报错
KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="admin"
    password="admin"
    user_admin="admin"
    user_alice="alice";
};

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

## 数据可视化
kafka默认是没有管理页面的，因此数据管理不是很方便，需要使用第三方工具进行数据可视化。 

[kafka tool](https://www.kafkatool.com/)
