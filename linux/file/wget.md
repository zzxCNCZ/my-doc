# wget
> 下载

**语法**

`wget [options] [url]`

### 常用指令 
```bash
# 直接下载
wget https://download.redis.io/releases/redis-6.0.8.tar.gz

# -O name  以别名保存下载文件
wget -O redis.tar.gz https://download.redis.io/releases/redis-6.0.8.tar.gz

# -P path  保存到指定目录
wget -P /tmp https://download.redis.io/releases/redis-6.0.8.tar.gz

# -c 断点续传，当下载大型文件时用得到
wget -c https://download.redis.io/releases/redis-6.0.8.tar.gz

# -b 后台下载， 默认情况下，下载过程日志重定向到当前目录中的wget-log文件中，要查看下载状态，可以使用tail -f wget-log查看。
wget -b https://download.redis.io/releases/redis-6.0.8.tar.gz

# -i 多文件下载, 如果先要一次下载多个文件，首先需要创建一个文本文件，并将所有的url添加到该文件中，每个url都必须是单独的一行。
vim urls.txt
wget -i urls.txt

# --limit-rate 选项限制下载速度
wget --limit-rate=1m https://download.redis.io/releases/redis-6.0.8.tar.gz

# -U 选项设定模拟下载, 如果远程服务器阻止wget下载资源，我们可以通过-U选项模拟浏览器进行下载，例如下面模拟谷歌浏览器下载。
wget -U "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36" https://download.redis.io/releases/redis-6.0.8.tar.gz

# --tries 选项增加重试次数，默认为1次，如果下载失败，可以通过--tries选项增加重试次数。
wget --tries=2 https://download.redis.io/releases/redis-6.0.8.tar.gz

# --timeout 选项设定超时时间，默认为30秒，如果下载超时，可以通过--timeout选项设定超时时间。
wget --timeout=2 https://download.redis.io/releases/redis-6.0.8.tar.gz

# --ftp-user 选项设定ftp用户名。 --ftp-password=选项设定ftp密码。  用于下载需要鉴权的ftp资源
wget --ftp-user=anonymous --ftp-password=anonymous https://download.redis.io/releases/redis-6.0.8.tar.gzget
```
