# nodejs
-  [参考自 GitHub 上的开源项目](https://github.com/nodesource/distributions)
```
# 我这里选择 8.x 的版本
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh

# 执行脚本，安装
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
```
- 设置代理
```
npm config set proxy 127.0.0.1:1080

```
- n 切换node 版本  [n](https://note.youdao.com/)
```
npm -g install n
# 安装指定版本
n 8.1.5

# 安装lts版本
n lts

# 删除版本
n rm 8.1.5
```