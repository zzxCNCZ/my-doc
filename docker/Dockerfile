FROM nginx:1.19

MAINTAINER banksy zhuang1994123@gmail.com

WORKDIR /app

# 将代码拷贝至 workdir
ADD  dist  /app

# nginx 配置（覆盖）
ADD nginx/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
