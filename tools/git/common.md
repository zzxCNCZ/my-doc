# git常用命令
> git常用指令,常用操作
## git init初始化仓库
```shell script
# git初始化 使当前目录变成可以管理的版本仓库（git repository) 会产生.git文件 
git init 
# 添加 readme.txt 到版本仓库，tips:一般使用git add . 即将当前目录所有内容添加到版本仓库
git add readme.txt
#把文件提交到仓库
git commit -m "wrote a readme file"
# 添加远程仓库 并命名origin为别名，第一次需要添加，之后提交直接运行 git push origin master
git remote add origin git@github.com:banksy/learngit.git
# 将master分之提交到origin 即远程仓库
git push origin master
```

## git其他指令
```shell script
# 查看repository的状态
git status 
# 查看修改了哪些内容
git diff 
# 查看提交日志
git log 
# 简洁地显示提交日志
git log --pretty=oneline
git log --pretty=oneline --abbrev-commit
# 回退到某个版本，比如这里回退到第前3个版本
git reset --hard HEAD~<3> 
# 回退到特定ID的版本
git reset --hard <commit ID>
# 记录了每个命令，可以用来查看每个操作的编号
git reflog
```

## git rm删除已提交目录
> 例如当误提交了.idea文件夹到远程仓库，需要删除远程仓库.idea文件夹且不删除本地
```shell script
# 编辑 .gitignore 文件，添加.idea文件夹
# --cached不会把本地的.idea删除
git rm -r --cached .idea   
git commit -m 'delete .idea dir'
git push -u origin master

git remote add grandlynn ssh://zhuang.zexin@58.211.187.150:45672/web/edu-web.git
# 添加两个仓库

git push -u grandlynn master
```

## git remote远程仓库
```shell script
# 设置两个远程仓库
# 添加别名为 grandlynn
git remote add grandlynn ssh://zhuang.zexin@101.101.101.1/web/edu-web.git
# 将master 分支提交到 grandlynn仓库
git push -u grandlynn master

# 查看远程仓库
git remote
# 添加远程仓库
git remote add origin http://host/add.git
# 修改远程仓库
git remote set-url origin http://host/modify.git
# 删除远程仓库
git remote rm origin

```

## git设置代理
```shell script
# http
git config --global https.proxy http://127.0.0.1:1080

git config --global https.proxy https://127.0.0.1:1080

# socks
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

# 取消代理
git config --global --unset http.proxy

git config --global --unset https.proxy
```

### 使用degit拉取并去除git仓库信息
> degit是一个轻量级的工具，可以从git仓库中拉取文件，但是不会保留git仓库的信息，只保留最新的文件

```shell script
# 安装degit
npm install -g degit
# 使用degit
degit <repository>
# 或试用npx执行
npx degit <repository>
# 例如
degit https://github.com/banksy/learngit.git
```