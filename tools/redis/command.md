# Redis command
```bash
- 获取所有key
```
keys *
```
- 获取单个key(没有返回 nil)
```
get keyname
```
- 给单个key赋值
```
set keyname keyvalue
```
- 设置过期时间
```
EXPIRE keyname 30 # 过期时间为30秒
```
- 查看剩余生存时间
```
TTL keyname
```
- 删除某个key(删除正确 返回1)
```
del key
```
- 将数据+1
```
incr key
```
- 清空整个缓存
```
flushdb
```
- 登陆
```
auth password
```
- 创建Hash
```
hmset lilei name "LiLei" age 25 title "Senior"
```
- 获取hash
```
hget lilei age
```
- 设置hash
```
hset lilei age 26
```
- List
```
lpush mylist 1231     lpush mylist 21313
```
- 获取List
```
lrange mylist 0 10
```
- Set
```
sadd myset 111 sadd myset 222
```
- 获取set
```
smembers myset
```
- Sorted Set
```
zadd myset 1 abd  zadd myset 2 adb   zadd myset 2 abc
```
- 获取Sorted Set
```
zrangebyscore myset 0 10
```
- scan cursor match [pattern] [count]
```
scan 0 match  zzx*  count 10
```
- setnx 操作 设置锁
- set key value [ex seconds] [px milliseconds] [nx|xx]
```
SET locktarget ex 10 nx 

```