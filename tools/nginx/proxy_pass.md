# nginx proxy_pass 详解
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

## location语法
= 严格匹配。如果这个查询匹配，那么将停止搜索并立即处理此请求。

~ 为区分大小写匹配(可用正则表达式)

!~为区分大小写不匹配

~* 为不区分大小写匹配(可用正则表达式)

!~*为不区分大小写不匹配

^~ 如果把这个前缀用于一个常规字符串,那么告诉nginx 如果路径匹配那么不测试正则表达式。
```
=====

location = / {

# 只匹配 / 查询。

}

location / {

# 匹配任何查询，因为所有请求都已 / 开头。但是正则表达式规则和长的块规则将被优先和查询匹配。

}

location ^~ /p_w_picpaths/ {

# 匹配任何已 /p_w_picpaths/ 开头的任何查询并且停止搜索。任何正则表达式将不会被测试。

}

location ~*.(gif|jpg|jpeg)$ {

# 匹配任何已 gif、jpg 或 jpeg 结尾的请求。

}

location ~*.(gif|jpg|swf)$ {

valid_referers none blocked start.igrow.cn sta.igrow.cn;

if ($invalid_referer) {

#防盗链

rewrite ^/ http://$host/logo.png;

}

}
```
