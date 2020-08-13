# 网络
> 网络操作
### 查看端口占用
```shell script
# 查看3306 端口占用
netstat -an | grep 3306
# 查看系统所有占用端口
netstat -tunlp
# 查看8000端口占用
netstat -nap|grep 8000

lsof -i tcp:8080 
```
### 测试网速
```shell script
sudo apt install speedtest-cli

# 执行
speedtest-cli
```
