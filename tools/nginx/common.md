# 常用指令
> nginx常用命令即操作
#### 常用命令
```shell script
# 查看nginx 主进程号
cat logs/nginx.pid

  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /nginx/)
  -c filename   : set configuration file (default: conf/nginx.conf)
  -g directives : set global directives out of configuration file
```

#### ubuntu下安装及启动
```shell script
# 安装
sudo apt-get install nginx
# 启动
sudo service nginx {start|stop|restart|reload|force-reload|status|configtest|rotate|upgrade}的命令启动。

# 至目录下启动
# 启动
start nginx  
# 停止  windows操作系统下执行 .\nginx
./nginx -s stop
# 重新加载配置文件
./nginx -s reload
# 测试nginx配置文件是否正确 
nginx -t -c /path/to/nginx.conf
```
