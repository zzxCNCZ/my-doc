## windows常用设置

### winget
```bash
# 搜索
winget search "Visual Studio Code"
# 安装 根据id安装
winget install --id Microsoft.VisualStudioCode
# 查看已安装的
winget list
# 卸载 根据id
winget uninstall --id Microsoft.VisualStudioCode
```



### wsl2配置
`.wslconfig` 新建于配置目录下，配置完后需重启
```bash
[experimental]
autoMemoryReclaim=gradual # 可以在 gradual 、dropcache 、disabled 之间选择
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
# 释放虚拟硬盘空间  wsl --manage 发行版名字 --set-sparse true
sparseVhd=true
[wsl2]
# 内存最大值限制
memory=4GB
# CPU核心最大值限制
processors=2
# 交换文件大小
swap=0
# 启用虚拟机的动态内存分配
dynamicMemory=true
# 启用虚拟机的动态虚拟硬盘
dynamicVhd=true
# 启用虚拟机的自动启动
autoStartup=true
```
### wsl 相关指令
```bash
# 关闭 所有实例
wsl --shutdown

# 查看正在运行的实例
wsl --list --running

# 关闭某个实例
wsl --terminate <实例名>

# 查看已安装
wsl -l -v

# 更新wsl
wsl --update
```


### 查看端口占用
```bash
netstat -ano | findstr :8080


# 根据pid查看对应的应用程序
tasklist | findstr 1234

# 杀死进程
taskkill -f -pid 1234

#使用powershell
Get-NetTCPConnection | Where-Object {$_.State -eq "Listen"} | Format-Table -Property LocalAddress, LocalPort, OwningProcess -AutoSize


# 根据pid查看对应的应用程序
Get-Process -Id 1234

# 杀死进程
Stop-Process -Id 1234 -Force

```

### 端口转发
```bash
# netsh添加端口转发
netsh interface portproxy add v4tov4 listenport=4444 listenaddress=0.0.0.0 connectport=3389 connectaddress=192.168.1.100

# 查看当前端口转发规则
netsh interface portproxy show all

# 删除端口转发规则
netsh interface portproxy delete v4tov4 listenport=8080 listenaddress=0.0.0.0
```