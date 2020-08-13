# nohup
> nohup 后台启动任务
```shell script
# 挂起服务 退出终端不断开
nohup ./test.sh &  
# 将日志输出到jenkins.file
nohup java -jar jenkins.war --httpPort=8080 >jenkins.file 2>&1 &

nohup command > mylog.log 2>&1 &
```
