# nginx常用配置

## Gzip配置
```shell script
gzip  on;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_vary on;
gzip_disable "MSIE [1-6]\.";
```

## ssl证书配置
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

## 使用auth_basic 授权登录访问地址
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

## example: 配置netdata密码登录
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

## 将http代理为https
- 方式1:
转发所有http至https
```conf
server {
    listen 80 default_server;

    server_name _;

    return 301 https://$host$request_uri;
}

```
转发特定域名http至https
```conf
server {
    listen 80;

    server_name foo.com;
    return 301 https://foo.com$request_uri;
}
```

- 方式2(old):
> Proxy HTTPS requests to a HTTP backend with NGINX [reference](https://serverfault.com/questions/145383/proxy-https-requests-to-a-http-backend-with-nginx/537278#537278)
```shell script
server {
    listen xxx.xxx.xxx.xxx:80;
    server_name www.example.net;

    rewrite ^(.*) https://$server_name$1 permanent;
}

server {
    listen 443 ssl;
    server_name www.example.net;

    root   /vhosts/www.example.net;
    
    # ssl                  on;
    ssl_certificate      /etc/pki/nginx/www.example.net.crt;
    ssl_certificate_key  /etc/pki/nginx/www.example.net.key;

    ssl_prefer_server_ciphers on;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
    ssl_dhparam /etc/pki/nginx/dh2048.pem;

    # intermediate configuration. tweak to your needs.
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:ECDHE-RSA-DES-CBC3-SHA:ECDHE-ECDSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

## 缓存控制
> 控制特定资源走缓存
```
  # 静态资源方式
  # location /test {
        #    add_header Cache-Control 'no-cache, must-revalidate, proxy-revalidate, max-age=0';
        #    alias /usr/share/nginx/test/;
        #    index index.html;
        #}

        #location ~* /test/(.+\.(gif|jpg|jpeg|png|css|js|ico|eot|otf|fon|font|ttf|ttc|woff|woff2))$ {
        #    alias /usr/share/nginx/test/$1;
        #    expires 1M;
        #    add_header Cache-Control "public";
        #}
  # proxy pass方式
  location /test/ {
            add_header Cache-Control 'no-cache, must-revalidate, proxy-revalidate, max-age=0';
            proxy_pass http://127.0.0.1:10089/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_connect_timeout 5;
        }


        location ~* /test/(.+\.(gif|jpg|jpeg|png|css|js|ico|eot|otf|fon|font|ttf|ttc|woff|woff2))$ {
            proxy_pass http://127.0.0.1:10089/$1;
            expires 1M;
            add_header Cache-Control "public";
        }

```


## 使用post访问json静态文件
```conf
server {
    listen 80;
    client_max_body_size 4G;

    access_log /var/sites/webapp/logs/access.maintenance.log;
    error_log /var/sites/webapp/logs/error.maintenance.log info;

    server_name api.webapp.com;

    # this guy redirects any path to /api.json
    rewrite ^.*$ /api.json last;

    location / {
        root /var/sites/webapp/webapp/;
        index api.json /api.json;

        # this is the magic
        error_page 405 = $uri;
    }

}
```