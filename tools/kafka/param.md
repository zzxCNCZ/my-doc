# kafka参数设置

### 常用参数设置 
> 提高kafka吞吐量

1. KAFKA_HEAP_OPTS\
kafka java heap memory  default  1g
```bash
KAFKA_HEAP_OPTS: -Xmx4096m -Xms2048m
```

2. background.threads
后台线程数，一般最大可配置cpu逻辑核数
```bash
background.threads: 20

# docker 配置
KAFKA_CFG_BACKGROUND_THREADS: 20
```
3. kafka memory pool
default 32m

```bash
buffer.memory
# docker 配置
KAFKA_CFG_BUFFER_MEMORY: 134217728   
# 128m 
```
4. signle request max size   
default  1m
```bash
max.request.size: 5242880
# 5m
# docker 配置
KAFKA_CFG_MAX_REQUEST_SIZE: 5242880
```
5. single record size
default 1m
```bash
# single record size
message.max.bytes
# docker 配置
KAFKA_CFG_MESSAGE_MAX_BYTES: 5242880
```

6. compression.type
```bash
# 压缩类型 gzip snappy lz4 无压缩  可以在broker配置，也可以在producer配置
compression.type: gzip
# docker 配置
KAFKA_COMPRESSION_TYPE: gzip
```


### 生产者和消费者配置
可以配置批量参数，配合kafka broker参数来提高吞吐量