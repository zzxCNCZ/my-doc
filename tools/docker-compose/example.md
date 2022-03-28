# docker-compose example
> 常用启动例子

### mysql
```bash
version: '3'
services:
  db:
    image: mysql
    # 容器名
    container_name: mysql 
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci  --sql_mode="" --log-bin-trust-function-creators=1 --max_connections=1024
    restart: always
    environment:
      #root管理员用户密码
      MYSQL_ROOT_PASSWORD: rootpwd 
      MYSQL_USER: test   #创建test用户
      MYSQL_PASSWORD: testpwd
      TZ: Asia/Shanghai
    security_opt:
       - seccomp:unconfined
    ports:
       #host物理直接映射端口为6666
       - '6666:3306'  
    volumes:
      #mysql数据库挂载到host物理机目录/e/docker/mysql/data/db
       - "./data/mysql:/var/lib/mysql"
      #容器的配置目录挂载到host物理机目录/e/docker/mysql/data/conf
       - "./data/config/mysql:/etc/mysql/conf.d"
```

### n2n & ffmpeg
```bash
version: '3.5'

services:

  edge:
    image: zzxcncz/n2n
    container_name: edge0
    entrypoint: ["edge"]
    command: ["-dn2n0", "-ccommunity", "-k123456", "-a10.10.0.10", "-lyourip:port", "-r", "-f"]
    devices:
      - /dev/net/tun
    cap_add:
      - NET_ADMIN
    ports:
      - 1999:1999  
    restart: "no"

  player-server:
    build:
      context: .
      args:
        SCHOOL_ID: ${SCHOOL_ID}
    container_name: player-server-qs
    network_mode: "service:edge"
    depends_on:
      - edge
    restart: "no" 

```

### gitlab
```bash
version: '3'
  
services:
  gitlab:
    image: 'gitlab/gitlab-ce:12.10.9-ce.0'
    restart: always
    hostname: 'gitlab.domian.com'
    container_name: gitlab
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://gitlab.domian.com'
        gitlab_rails['gitlab_shell_ssh_port'] = 2022
    ports:
      - '8080:80'
      - '2022:22'
    volumes:
      - '/media/home/zzx/docker/gitlab/config:/etc/gitlab'
      - '/media/home/zzx/docker/gitlab/logs:/var/log/gitlab'
      - '/media/home/zzx/docker/gitlab/data:/var/opt/gitlab'
    logging:
      options:
        max-size: 100m

```

### tomcat
```bash
version: '2'
services:
  tomcat:
    # restart: always
    image: tomcat
    container_name: tomcat-test
    ports:
      - 6084:8080
    volumes:
      - ./webapps/:/usr/local/tomcat/webapps/
      - ./logs/:/usr/local/tomcat/logs/
    environment:
      TZ: Asia/Shanghai

```
