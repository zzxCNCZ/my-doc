# kafka 使用方法

##　Spring Boot 集成kafka

[Intro to Apache Kafka with Spring](https://www.baeldung.com/spring-kafka)

[Using Kafka with Spring Boot](https://reflectoring.io/spring-boot-kafka/)

## Kafka Vocabulary

- **Producer**: A producer is a client that sends messages to the Kafka server to the specified topic.
- **Consumer**: Consumers are the recipients who receive messages from the Kafka server.
- **Broker**: Brokers can create a Kafka cluster by sharing information using Zookeeper. A broker receives messages from producers and consumers fetch messages from the broker by topic, partition, and offset.
- **Cluster**: Kafka is a distributed system. A Kafka cluster contains multiple brokers sharing the workload.
- **Topic**: A topic is a category name to which messages are published and from which consumers can receive messages.
- **Partition**: Messages published to a topic are spread across a Kafka cluster into several partitions. Each partition can be associated with a broker to allow consumers to read from a topic in parallel.
- **Offset**: Offset is a pointer to the last message that Kafka has already sent to a consumer.

## kafka groupId 设置规则
> 设置groupId改变消费数据的规则

只要不更改group.id，每次重新消费kafka，都是从上次消费结束的地方继续开始，不论"auto.offset.reset”属性设置的是什么

1. 场景一：Kafka上在实时被灌入数据，但kafka上已经积累了两天的数据，如何从最新的offset开始消费？

    （最新指相对于当前系统时间最新）
    
    1.将group.id换成新的名字(相当于加入新的消费组)
    
    2.网上文章写还要设置 properties.setProperty("auto.offset.reset", "latest”)
    实验发现即使不设置这个，只要group.id是全新的，就会从最新的的offset开始消费



2. 场景二：kafka在实时在灌入数据，kafka上已经积累了两天的数据，如何从两天前最开始的位置消费？
   
    1.将group.id换成新的名字
    2.properties.setProperty("auto.offset.reset", "earliest”)

3. 场景三：不更改group.id，只是添加了properties.setProperty("auto.offset.reset", "earliest”)，consumer会从两天前最开始的位置消费吗？

    不会，只要不更改消费组，只会从上次消费结束的地方继续消费

4. 场景四：不更改group.id，只是添加了properties.setProperty("auto.offset.reset", "latest”)，consumer会从距离现在最近的位置消费吗？
    
    不会，只要不更改消费组，只会从上次消费结束的地方继续消费 
