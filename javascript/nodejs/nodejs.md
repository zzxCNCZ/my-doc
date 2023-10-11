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

### macos nvm 切换node版本
#### 配置nvm
```bash 
# 查看安装nvm信息指引
brew info nvm

```
- 在shell中可以使用nvm命令
```

$ cd ~ 

$ vim .bash_profile 
```
- 添加以下命令
```
export NVM_DIR=~/.nvm
```
- 然后重新source
```
source $(brew --prefix nvm)/nvm.sh
```
- 如果提示无效——运行
```
 . ./.bash_profile
```

- 使用nvm安装node
```
$ nvm ls-remote 查看 所有的node可用版本

$ nvm install xxx 下载你想要的版本

$ nvm use xxx 使用指定版本的node 

$ nvm alias default xxx 每次启动终端都使用该版本的node 

```
- 完成安装
```
$ node -v

$ npm -v 
```