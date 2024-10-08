# linux常用操作
> 常用操作汇总
### 生成 ssh 密钥
```shell script
# 默认生成在/root/.ssh 文件夹下
ssh-keygen -t rsa -C “zhuangzexin.top”
```
## 配置authorized_keys实现免密码登录
```shell script
# 确认本机sshd的配置文件
vim /etc/ssh/sshd_config

# 取消注释
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# 重启sshd服务
service sshd restart

# 更改权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# 将所要添加的计算机的公钥添加到目标主机上实现免密码登陆（在更新博客时需要用到）， 当添加了公钥还是不能登陆，很可能是因为上级文件权限的问题，检查.ssh 文件夹、root文件夹，authorized_keys 文件权限是否异常。
# 如果没有authorized_keys 文件可自行添加
cat id_rsa.pub >> authorized_keys 

# linux 主机下可使用此命令 从a服务器复制到b服务器
# b服务器上的authorized_keys权限 为600 ： chmod 600 authorized_key
scp /root/.ssh/id_rsa.pub root@192.168.1.181:/root/.ssh/authorized_keys
```
## 启动 boot reboot
```shell script
shutdown #一分钟后关机
shutdown -h now #现在立即关机
shutdown -r now #现在立即重启
shutdown -r +3 #三分钟后重启
reboot # 重启
exit # 注销当前账户
```
## scp
```shell script
# 远程到本地
scp -P 9022  admin@192.168.1.181:/root/frp/frpc /Users/mac/Downloads

# 本地到远程
scp -P 9022   /Users/mac/Downloads/v2ray-linux-arm.zip  admin@192.168.1.181:/tmp/share/sda1  
```
## 添加用户 adduser
```shell script
adduser linuxidc

password linuxidc
# 授权 sudo
chmod -v u+w /etc/sudoers
 
vim /etc/sudoers

# Allow root to run any commands anywher  
root    ALL=(ALL)       ALL  
linuxidc  ALL=(ALL)       ALL  #这个是新增的用户

#或者
sudo adduser username sudo

# 还原权限
chmod -v u-w /etc/sudoers
```
## 权限 chown chmod
```shell script
chown -R www-data:www-data db nextcloud
# 给media文件夹下所有文件加入82用户组
chown -R 82:82 media/ 

#即 rwxrwxrwx 给 文件夹开放所有权限
chmod 777
# 每组rwx 分别代表 拥有者： 
r -> 4
w -> 2
x -> 1
 
```

## ubuntu 初始化
```bash
# 时区修改
timedatectl set-timezone Asia/Shanghai

# 设置root password
# 用su 登录root
sudo passwd root

# 安装openssl
# openssl 默认开启了 公钥认证，root用户可以用公钥登录，不推荐直接开启root远程登录
sudo apt install openssl
sudo apt install libssl-dev

# sshd service 配置文件目录
/etc/ssh/ssh_config
```

### 查看常用的cli指令
```bash
history | awk '{CMD[$2]++;count++;}END { for (a in CMD)print CMD[a] " " CMD[a]/count*100 "% " a;}' | grep -v "./" | column -c3 -s " " -t | sort -nr | nl | head -n10
```

### ssh 创建本地端口转发
> 这个指令的作用是通过SSH连接到远程服务器 10.48.144.148，并在本地创建一个端口转发，将本地的1153端口与远程主机41.188.137.154的80端口进行通信
```bash
ssh -p 80 -fCNg -L 1153:41.188.137.154:80 administrator@10.48.144.148
```
