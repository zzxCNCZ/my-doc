# process
> 常用进程操作
### 查看进程状态 ps
```shell script
# 根据名称 查看进程
ps -ef|grep name

# 根据端口号 或者pid查看进程
ps aux|grep 1936

# 查看被kill 进程
dmesg | grep -i -B100 'killed process'

```

### 查看cpu占用
```shell script
top -bn 1 -i -c
```
