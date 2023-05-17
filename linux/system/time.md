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
