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
    worker_connections 20000;
}
```

#### 访问403问题
> nginx 的所有者为root,一般要以root启动（建议），即sudo nginx启动
1. nginx.conf  user www-data;改成 user root;
2. 文件权限问题。
