# git branch

## git branch常用指令
```shell script
# 创建分支
git branch dev
# 切换到分支
git checkout dev
# merge分支  合并dev到master分支
git checkout master
git merge dev

# 删除分支
git checkout master
git branch -d dev


# 查询当前远程的版本
$ git remote -v
# 获取最新代码到本地(本地当前分支为[branch]，获取的远端的分支为[origin/branch])
$ git fetch origin master  [示例1：获取远端的origin/master分支]
$ git fetch origin dev [示例2：获取远端的origin/dev分支]
# 查看版本差异
$ git log -p master..origin/master [示例1：查看本地master与远端origin/master的版本差异]
$ git log -p dev..origin/dev   [示例2：查看本地dev与远端origin/dev的版本差异]
# 合并最新代码到本地分支
$ git merge origin/master  [示例1：合并远端分支origin/master到当前分支]
$ git merge origin/dev [示例2：合并远端分支origin/dev到当前分支]
```

::: tip 分支合并细节
git merge --no-ff -m "msg" <branch_name> #合并分支时禁用Fast forward模式
我们知道如果使用fast-forward方式进行分支合并，只是简单改变了分支指针，而不会产生新的commit记录。
为了保证合并数据的完整性，我们也可以在合并时指定不使用fast-forward方式，使用 --no-ff 选项。
这样，在merge时就会生成一个新的commit，从日志上就可以看到分支合并记录了。
:::


## git branch回滚到历史版本
```shell script
# 全部回滚不保留修改
git reset --hard  id
# 提交到远程
git push -f
```
