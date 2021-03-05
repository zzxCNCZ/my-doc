# docker-compose 安装及基本使用
> 

## docker-compose安装 
```shell script
# 在线安装
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 离线安装
mv docker-compose-Linux-x86_64 /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# 查看版本信息
docker-compose -v
```

## docker-compose常用命令
> Docker compose的使用非常类似于docker命令的使用，但是需要注意的是大部分的compose命令都需要到docker-compose.yml文件所在的目录下才能执行。
```shell script
# 使用指定文件启动
docker-compose -f  dev.yml  up

# compose pull 镜像，如果使用的镜像没有才会pull

docker-compose build --pull

# compose以守护进程模式运行加-d选项

docker-compose up -d

# 查看有哪些服务，使用docker-compose ps命令，非常类似于 docker 的ps命令
docker-compose ps

# 查看compose日志
docker-compose logs redis

# 查看最后200行的日志
docker-compose logs --tail="200"

build 构建或重建服务
help 命令帮助
kill 杀掉容器
logs 显示容器的输出内容
port 打印绑定的开放端口
ps 显示容器
pull 拉取服务镜像
restart 重启服务
rm 删除停止的容器
run 运行一个一次性命令
scale 设置服务的容器数目
start 开启服务
stop 停止服务
up 创建并启动容器


# 限制容器日志大小配置
logging:
    options:
      max-size: 10m               

```

## docker-compose nginx example
```shell script
# 构建建启动nignx容器 （只启动nginx容器）
docker-compose up -d nginx                     
# 登录到nginx容器中
docker-compose exec nginx bash            
# 删除所有nginx容器,镜像
docker-compose down                             
# 显示所有容器
docker-compose ps                                   
# 重新启动nginx容器
docker-compose restart nginx                  
# 在php-fpm中不启动关联容器，并容器执行php -v 执行完成后删除容器
docker-compose run --no-deps --rm php-fpm php -v  
# 构建镜像
docker-compose build nginx                        
# 不带缓存的构建
docker-compose build --no-cache nginx 
#  查看nginx的日志 
docker-compose logs  nginx                    
#  查看nginx的实时日志
docker-compose logs -f nginx                  
#  验证（docker-compose.yml）文件配置，当配置正确时，不输出任何内容，当文件配置错误，输出错误信息。 
docker-compose config  -q                       
#  以json的形式输出nginx的docker日志
docker-compose events --json nginx      
#  暂停nignx容器
docker-compose pause nginx                
# 恢复ningx容器
docker-compose unpause nginx             
# 删除容器（删除前必须关闭容器）
docker-compose rm nginx                       
# 停止nignx容器
docker-compose stop nginx                    
# 启动nignx容器
docker-compose start nginx   
```
