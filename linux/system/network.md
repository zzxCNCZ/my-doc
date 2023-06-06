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
