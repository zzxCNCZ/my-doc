# 常见问题

#### 上传文件等413问题
```shell script
# 根据自己的需要设置设置client_max_body_size大小
# 在server ，location中,http中都可以设置
# 如果reload的无效，尝试重启nginx
client_max_body_size 200m;
```

#### worker_connections are not enough
```shell script
# 修改
events {
    # 根据自己的需要设置设置worker_connections大小
    # 参考系统的最大文件句柄数
    worker_connections 20000;
}

worker_processes 设置为cpu核数（cpu逻辑核心数量即可）
```

#### 访问403问题
> nginx 的所有者为root,一般要以root启动（建议），即sudo nginx启动
1. nginx.conf  user www-data;改成 user root;
2. 文件权限问题。

#### 访问502的问题
查看后端服务正常,但是请求后端接口时nginx错误日志报错：`no live upstreams while connecting to upstream`
查看该错误的解释可以得到的结果是upstream中没有可以提供服务的server ，即nginx已经发现不了存活的后端了,但是,我直接访问后端的server确是可以使用的,证明server端可用.
最后得出结论是nginx和server端没有保持tcp链接,如果没有设置keepalive参数默认是不会保持tcp链接的,所以需要在upstream中设置keepalive参数,如下:
```shell script
http {
    upstream backend {
        server 192.168.1.100 weight=1 max_fails=2 fail_timeout=30s;
        keepalive 100;
    }
}
server {
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;         
        proxy_set_header Connection "";
    }
}
# HTTP协议中对长连接的支持是从1.1版本之后才有的，因此最好通过proxy_http_version指令设置为”1.1”；
```

**keepalive**
1. The connections parameter sets the maximum number of idle keepalive connections to upstream servers connections（设置到upstream服务器的空闲keepalive连接的最大数量）
2. When this number is exceeded, the least recently used connections are closed. （当这个数量被突破时，最近使用最少的连接将被关闭）
3. It should be particularly noted that the keepalive directive does
not limit the total number of connections to upstream servers that an nginx worker process can open.（特别提醒：keepalive指令不会限制一个nginx worker进程到upstream服务器连接的总数量）

大概设置大小根据qps设置，假设10000 QPS和100毫秒响应时间就可以推算出需要的长连接数量大概是1000.


### 请求头过大问题 
> upstream sent too big header while reading response header from upstream

```bash
server {

		proxy_busy_buffers_size   512k;
 		proxy_buffers   4 512k;
 		proxy_buffer_size   256k;
 		# rest of the nginx config below #
}
```