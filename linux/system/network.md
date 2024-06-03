# 网络
> 网络操作
### 查看端口占用 netstat
```shell script
# 查看3306 端口占用
netstat -an | grep 3306
# 查看系统所有占用端口
netstat -tunlp
# 查看8000端口占用
netstat -nap|grep 8000

lsof -i tcp:8080 
```


### 查看tcp连接
```shell script
netstat -nat | awk '{print $6}' | sort | uniq -c | sort -rn

netstat -n | awk '/^tcp/ {++state[$NF]} END {for(key in state) print key,"\t",state[key]}'
```

### 测试网速
```shell script
sudo apt install speedtest-cli

# 执行
speedtest-cli
```

### iftop 工具
```
yum install -y epel-release && yum install -y iftop

iftop -nN -i eth0实时查看eth0网卡的各个连接和网速

```

![LkezHO](https://chevereto.zhuangzexin.top/images/2021/11/01/LkezHO.png)
中间的<= =>这两个左右箭头，表示的是流量的方向。

TX：发送流量
RX：接收流量
TOTAL：总流量
Cumm：运行iftop到目前时间的总流量
peak：流量峰值
rates：分别表示过去 2s 10s 40s 的平均流量


### 使用firewall-cmd端口转发

```bash
# 开启端口转发
sudo firewall-cmd --add-masquerade --permanent
# 配置端口转发
sudo firewall-cmd --zone=public --add-forward-port=port=12180:proto=tcp:toaddr=20.10.32.7:toport=12180 --permanent
# 删除端口转发规则
sudo firewall-cmd --zone=public --remove-forward-port=port=12180:proto=tcp:toaddr=20.10.32.7:toport=12180 --permanent

# 查看当前转发规则
sudo firewall-cmd --list-forward-ports
# 重启防火墙
sudo firewall-cmd --reload
```

### 使用firewall-cmd开放端口

```bash
# 开放端口(配置完后也需要重启)
sudo firewall-cmd --zone=public --add-port=12180/tcp --permanent
# 查看当前开放端口
sudo firewall-cmd --list-ports
# 查看所有规则
sudo firewall-cmd --zone=public --list-all
```
