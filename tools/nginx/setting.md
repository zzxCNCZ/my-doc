# 常用配置

#### Gzip配置
```shell script
gzip  on;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_vary on;
gzip_disable "MSIE [1-6]\.";
```

#### ssl证书配置
```shell script
## 将证书放置于nginx安装目录下
server {
     listen 443;
     server_name blog.zhuangzexin.top;
     ssl on;
     ssl_certificate  /etc/nginx/cert/2590551_blog.zhuangzexin.top.pem;
     ssl_certificate_key /etc/nginx/cert/2590551_blog.zhuangzexin.top.key;
     ssl_session_timeout 5m;
     ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
     ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
     ssl_prefer_server_ciphers on;
     location / {
         root /var/www/blog;
         index  index.html index.htm;
     }
 }
```

#### 使用auth_basic 授权登录访问地址
1. 生成密码
```shell script
# 生成username password
# 两种方法
# 第一种：需安装htpasswd  
htpasswd -c /etc/nginx/passwords username 
# 第二种：
printf "yourusername:$(openssl passwd -apr1)" > /etc/nginx/passwords

# 以上注意生成的passwords 不要放在ngxin访问不到的目录，比如root，不然访问会出现500,详见error.log

```
2. 配置
```shell script
# auth_basic "内容" 为登录时提醒内容
auth_basic "Please input password";
auth_basic_user_file /etc/nginx/passwords;
```

#### example: 配置netdata密码登录
```shell script
upstream netdata {
    server 127.0.0.1:19999;
    keepalive 64;
}

server {
    listen       80;
    #server_name  localhost 127.0.0.1;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location /netdata {
        return 301 /netdata/;
    }

   location ~ /netdata/(?<ndpath>.*) {
        # auth
        auth_basic "Please input password";
        auth_basic_user_file /etc/nginx/passwd;
        proxy_redirect off;
        proxy_set_header Host $host;

        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_pass_request_headers on;
        proxy_set_header Connection "keep-alive";
        proxy_store off;
        proxy_pass http://netdata/$ndpath$is_args$args;

        gzip on;
        gzip_proxied any;
        gzip_types *;
    }
}
```
