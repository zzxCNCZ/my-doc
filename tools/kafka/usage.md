# kafka 使用方法

## Spring Boot 集成kafka

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


## kafka partition 规则
### partition的作用

Kafka是一种高性能的分布式消息系统，它使用分区（partitions）来实现数据的持久化和并行处理。每个主题（topic）在Kafka中都可以被划分为一个或多个分区，而每个分区都是有序且不可变的消息序列。

以下是Kafka分区的几个重要作用：

- **水平扩展**：Kafka的分区机制允许将一个主题的负载分散到多个服务器上进行处理，从而实现水平扩展。每个分区都可以独立地分配给不同的机器，这样可以通过增加分区数量来增加整个集群的处理能力。

- **容错性**：分区是Kafka提供的容错机制的基础。通过将消息存储在多个分区中，即使某个分区或服务器出现故障，其他分区仍然可以正常工作。消费者可以从其他可用的分区读取消息，确保数据的可靠性和持久性。

- **顺序保证**：每个分区内的消息是有序的，并且Kafka保证了所有分区的消息总体有序。这意味着，无论是生产者还是消费者，在单个分区内的消息顺序是保证的，而在整个主题范围内的消息顺序也是保证的。

- **负载均衡**：通过将消息分布在多个分区中，Kafka可以实现消费者的负载均衡。多个消费者可以同时从不同的分区读取消息，从而提高整个系统的吞吐量和并发性能。

- **基于分区的并行处理**：Kafka的分区机制支持生产者和消费者的并行处理。多个生产者可以同时向不同的分区发送消息，而多个消费者也可以同时从不同的分区读取消息。这种并行处理方式使得Kafka能够满足高吞吐量、低延迟的需求。

> **Q1**: 每个分区的数据是一样的吗?

kafka每个分区中的数据是有序且不可变的，但不要求每个分区中的数据完全相同。
在Kafka中，每个主题可以划分为一个或多个分区，并且每个分区都是一个有序的消息日志。每个分区内的消息按照写入的顺序进行存储，并且每条消息都被赋予一个唯一的偏移量（offset）来表示其在分区中的位置。

此外，每个分区都有自己的一组副本（replicas），用于提供容错性。这些副本被分布在不同的服务器上，以防止分区的单点故障。副本之间的数据一致性由Kafka集群维护和管理。

> **Q2**: kafka集群clusterA有两个broker：brokerA和brokerB,有一个topicA有两个partition,和2个replication。producer A生产了100条消息，到clusterA中，如果此时brokerA掉线了，消息会如何分布?

在这种情况下，当BrokerA掉线时，Kafka集群会自动进行故障转移，确保消息的可靠性和持久性。由于TopicA有两个分区且有两个副本，以下是消息的分布情况：

1. Partition 0：

Leader：可以是BrokerA或BrokerB中的任何一个。
Replica 1：如果此时Leader是BrokerA，则Replica 1位于BrokerB；如果Leader是BrokerB，则Replica 1位于BrokerA。
Replica 2：如果此时Leader是BrokerA，则Replica 2位于BrokerB；如果Leader是BrokerB，则Replica 2位于BrokerA。

2. Partition 1：

Leader：可以是BrokerA或BrokerB中的任何一个。
Replica 1：如果此时Leader是BrokerA，则Replica 1位于BrokerB；如果Leader是BrokerB，则Replica 1位于BrokerA。
Replica 2：如果此时Leader是BrokerA，则Replica 2位于BrokerB；如果Leader是BrokerB，则Replica 2位于BrokerA。
当Producer A生产100条消息时，这些消息将被均匀地分发到两个分区中。由于BrokerA掉线，如果Leader是BrokerA，那么Leader将无法访问。此时，Kafka会从剩余的可用副本中选择新的Leader来接管该分区。

假设之前Leader是BrokerA，并且它掉线了，而副本1（Replica 1）和副本2（Replica 2）仍然可用。Kafka会选择其中一个副本作为新的Leader，例如选择副本1作为新的Leader。一旦新的Leader选举完成，消费者将可以从新的Leader中读取消息。

整个过程是由Kafka集群自动处理的，而Producer A无需关心具体的分区和副本情况，它只需要将消息发送到TopicA即可。 Kafka通过维护一致性和复制机制来保证消息的可靠性，以应对节点故障和数据丢失的情况。

> **Q3**: 如果有两个broker,推荐几个partition和replication的组合?

- **Partition（分区）的数量**：对于只有两个Broker的情况，最好将Partition设置为2的幂次方
- **Replication（复制）的数量**：在两个Broker的情况下，设置每个Partition的Replication Factor为2是常见的做法。这意味着每个Partition都有两个副本，一个Leader副本和一个Follower副本。


> **Q4**: 已经存在的topic如何修改分区呢?

在Kafka中，已经存在的Topic的分区数是无法直接修改的。但你可以通过以下步骤来实现类似于修改分区的效果：

1. 创建一个新的Topic：首先，创建一个具有所需分区数的新Topic，并确保它的配置和原有Topic相同（例如，复制因子、清理策略等）。

2. 使用消费者将消息从旧Topic中读取并发送到新Topic：使用一个专门编写的消费者应用程序，从旧Topic中读取消息，并将这些消息重新发送到新的Topic中。在重新发送之前，可以根据需要对消息进行处理或转换。

3. 停止生产者向旧Topic发送消息：停止生产者向原来的Topic发送新的消息，以确保所有的消息都被消费者读取和发送到新的Topic中。

4. 切换消费者到新Topic：将消费者应用程序重新配置为订阅新的Topic，并验证消费者能够正确消费新Topic中的消息。

5. 删除旧Topic：在确认新的Topic正常运行后，你可以选择删除旧的Topic，以释放存储空间。

需要注意的是，上述过程可能会导致一段时间内的数据重复消费，因为消费者将读取并重新发送原有Topic中的消息。在执行此操作时，请确保考虑到数据一致性和处理幂等性。


**场景1**: kafka集群clusterA有两个broker：brokerA和brokerB,有一个topicA有两个partition,和2个replication。producer A生产了100条消息，到clusterA中，如果此时brokerA掉线了，消息会如何分布?

在这种情况下，当BrokerA掉线时，Kafka集群会自动进行故障转移，确保消息的可靠性和持久性。由于TopicA有两个分区且有两个副本，以下是消息的分布情况：

1. **Partition 0**：

Leader：可以是BrokerA或BrokerB中的任何一个。
Replica 1：如果此时Leader是BrokerA，则Replica 1位于BrokerB；如果Leader是BrokerB，则Replica 1位于BrokerA。
Replica 2：如果此时Leader是BrokerA，则Replica 2位于BrokerB；如果Leader是BrokerB，则Replica 2位于BrokerA。

2. **Partition 1**：

Leader：可以是BrokerA或BrokerB中的任何一个。
Replica 1：如果此时Leader是BrokerA，则Replica 1位于BrokerB；如果Leader是BrokerB，则Replica 1位于BrokerA。
Replica 2：如果此时Leader是BrokerA，则Replica 2位于BrokerB；如果Leader是BrokerB，则Replica 2位于BrokerA。
当Producer A生产100条消息时，这些消息将被均匀地分发到两个分区中。由于BrokerA掉线，如果Leader是BrokerA，那么Leader将无法访问。此时，Kafka会从剩余的可用副本中选择新的Leader来接管该分区。

假设之前Leader是BrokerA，并且它掉线了，而副本1（Replica 1）和副本2（Replica 2）仍然可用。Kafka会选择其中一个副本作为新的Leader，例如选择副本1作为新的Leader。一旦新的Leader选举完成，消费者将可以从新的Leader中读取消息。

整个过程是由Kafka集群自动处理的，而Producer A无需关心具体的分区和副本情况，它只需要将消息发送到TopicA即可。 Kafka通过维护一致性和复制机制来保证消息的可靠性，以应对节点故障和数据丢失的情况。