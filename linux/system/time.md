# 时间设置
> 主要针对ubuntu系统的时间设置

### 查看当前时间
```bash

date

```

### timedatectl使用
```bash

# 查看当前时区 及时间设置
timedatectl

# 设置时区 e.g. Asia/Shanghai
sudo timedatectl set-timezone Asia/Shanghai


#手动设置时间
sudo timedatectl set-time "2019-12-12 12:12:12"

#开启ntp服务
sudo timedatectl set-ntp true
#关闭ntp服务
sudo timedatectl set-ntp false

# 查看时间同步状态
timedatectl timesync-status

# 验证时间配置
timedatectl show-timesync --all


```
### timesyncd服务
```bash
# 查看timesyncd服务状态 如果看到Initial synchronization to time server or Synchronized to time server则表示时间同步成功
systemctl status systemd-timesyncd.service
# 启动timesyncd服务
systemctl start systemd-timesyncd.service
# 停止timesyncd服务
systemctl stop systemd-timesyncd.service
# 重启timesyncd服务
systemctl restart systemd-timesyncd.service
```

### timesyncd配置文件
```bash
# 配置文件路径
/etc/systemd/timesyncd.conf
```

### 硬件时间同步
```bash
# 查看硬件时间
sudo hwclock --show

# 将系统时间同步到硬件时间
sudo hwclock --systohc
# 将硬件时间同步到系统时间
sudo hwclock --hctosys
```

[deepin 时间和时区](https://wiki.deepin.org/zh/%E5%BE%85%E5%88%86%E7%B1%BB/03_%E6%8C%89%E7%9F%A5%E8%AF%86%E7%82%B9%E7%AD%89%E7%BA%A7%E5%88%92%E5%88%86/01_%E4%B8%AD%E9%98%B6/09_%E6%97%B6%E9%97%B4%E7%9B%B8%E5%85%B3/%E6%97%B6%E9%97%B4%E5%92%8C%E6%97%B6%E5%8C%BA)