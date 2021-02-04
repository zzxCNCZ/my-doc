# proxy_pass 详解
> 代理转发配置 location 和 proxy_pass 详解

## location 和 proxy_pass 带斜杠与不带斜杠
例如:
```
server {
        listen     80;
        server_name  test.zhuangzexin.top;
        location  /test {
            proxy_pass http://127.0.0.1:8080
        }
}
```
如果访问 http://test.zhuangzexin.top/test/user 则实际请求的路径为 http://127.0.0.1:8080/test/user
即nginx会把包括匹配到的内容都追加到proxy_pass地址后面。
如果配置是 :
```
 location  /test {
            proxy_pass http://127.0.0.1:8080/
        }
```
访问 http://test.zhuangzexin.top/test/user  则实际请求的路径为 http://127.0.0.1:8080/user
即nginx不会把匹配到的内容追加到proxy_pass地址后面。

location 最后待斜杠和不带斜杠的区别如下:
不带斜杠，可以匹配
```
 http://test.zhuangzexin.top/test/user
 http://test.zhuangzexin.top/testuser
 http://test.zhuangzexin.top/testuser/info
```
带斜杠可以匹配
``` 
http://test.zhuangzexin.top/test/user
http://test.zhuangzexin.top/test/system
```
