# nginx 相关特性

### nginx 反代静态页面是如何做缓存控制的
1. **nginx 反向代理静态页面304 Not Modified是什么意思？**

当使用Nginx作为反向代理服务器，并且它在响应客户端请求时收到一个304 Not Modified状态码时，这意味着客户端发送了一个条件请求（例如，带有If-Modified-Since或If-None-Match头部字段），并且所请求的资源在上次请求后没有发生变化。因此，Nginx不会返回完整的资源内容，而是告诉客户端可以使用其本地缓存版本。

304 Not Modified状态码是一种HTTP响应状态码，表示服务器已经接收到请求，但资源未发生变化，无需再次传输。这个状态码通常用于优化网络传输，减少不必要的数据传输。

当客户端收到304 Not Modified时，它会从本地缓存中加载该资源，而无需重新下载。这样可以节省带宽和提高页面加载速度，因为客户端不需要获取已经存在的资源副本。

2. **nginx是如何判断资源有没有发生变化?**
   
Nginx判断资源是否发生变化是通过比较客户端请求中的条件头部字段和服务器上资源的相关信息进行的。下面是几个常用的条件头部字段：

If-Modified-Since：当客户端首次请求资源时，服务器会在响应头部添加Last-Modified字段，表示资源的最后修改时间。当客户端再次请求该资源时，它会在请求头部添加If-Modified-Since字段，将上次接收到的Last-Modified值发送给服务器。

如果服务器上的资源的最后修改时间晚于或等于If-Modified-Since字段指定的时间，服务器将返回完整的资源内容（状态码200）。
如果服务器上的资源的最后修改时间早于If-Modified-Since字段指定的时间，服务器将返回304 Not Modified状态码，告诉客户端可以使用本地缓存。
If-None-Match：当客户端首次请求资源时，服务器会在响应头部添加ETag字段，表示资源的唯一标识符。当客户端再次请求该资源时，它会在请求头部添加If-None-Match字段，将上次接收到的ETag值发送给服务器。

如果服务器上的资源的ETag与If-None-Match字段匹配，表示资源未发生变化，服务器将返回304 Not Modified状态码。
如果服务器上的资源的ETag与If-None-Match字段不匹配，表示资源发生了变化，服务器将返回完整的资源内容（状态码200）。
Nginx将根据这些条件头部字段和服务器上资源的相关信息来判断资源是否发生变化，并相应地返回适当的HTTP状态码。这种机制可以帮助减少不必要的数据传输，提高网络性能和效率。

### nginx health check 负载均衡健康状态检查
e.g. 以下为一个健康检查的配置
```nginx
upstream backend {
    server backend1.example.com weight=5;
    server backend2.example.com:8080 max_fails=3 fail_timeout=30s;
    server unix:/tmp/backend3;
    server backup1.example.com backup;
}
```
1. **weight=5**：权重，权重越高，被分配到的几率越大
2. **max_fails=3**：最大失败次数，超过这个次数，就认为这个节点不可用
3. **fail_timeout=30s**：失败超时时间，超过这个时间，才会重新被分配到
4. **backup**：备份机器，当所有的机器都不可用时，才会使用这个机器
5. **down**：标记机器为不可用，当机器出现问题时，可以临时将机器标记为不可用，这样就不会再将请求分配到这台机器上了

*注* 
1. 还有一种健康检查的方式是使用第三方模块：`nginx_upstream_check_module`
2. `health_check` 模块是 `nginx` 的商业模块，需要付费