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
