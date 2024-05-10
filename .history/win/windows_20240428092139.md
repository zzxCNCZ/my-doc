## windows

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



## wsl
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
```