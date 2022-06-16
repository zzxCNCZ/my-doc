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

## 数据可视化
kafka默认是没有管理页面的，因此数据管理不是很方便，需要使用第三方工具进行数据可视化。 

[kafka tool](https://www.kafkatool.com/)
