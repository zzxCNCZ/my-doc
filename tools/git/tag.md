# git tag
> 为当前分支的最近一次提交(HEAD) 打一个标签。e.g. 为release分支打一个 "v1.0" 的标签：git tag -a "v1.0"(-a 可选).
> 可以用来作为版本的标签
## git tag常用指令
```bash
# 查看所有tag
git tag

# 添加tag -a -m 可选
git tag -a <tagname> -m "your comment"

# 为一个commit id:33214d3  打标签
git  tag v1.1 33214d3

# 提交一个tag
git push origin [tagname]
# 提交所有tag
git push origin --tags
```

#### 其他指令
```bash
# 拉取指定tag代码
git clone --branch [tag] [git地址]
# 本地已有仓库时
git checkout [tag]
```
