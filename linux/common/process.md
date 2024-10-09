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

### 查看内存占用
```bash
# 使用top命令
top
# 使用shift m命令
shift + m 来 按照内存占用排序
# 使用shift f命令
shift + f 来选择要显示的列
# 使用shift o命令
shift + o 来选择排序的列
# 使用shift r命令
shift + r 来反转排序
```
