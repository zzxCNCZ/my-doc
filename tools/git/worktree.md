# git worktree
> git worktree工作方式及在多 ai agent 中的开发场景应用
> git worktree 是 Git 提供的一种功能，允许用户在同一个 Git 仓库中创建多个工作树（worktree）。每个工作树可以独立地检出不同的分支或提交，从而实现并行开发和测试。

## 创建和管理工作树

**当前分支**： main
**当前目录**  /path/mycode

```bash
# cd /path/mycode
# 创建一个新的工作树，检出指定的分支
# git worktree add -b [新分支名] [新目录路径] [基于哪个分支]
# 例子为创建一个名为 claude 的新分支，并在 /path/claude 目录下创建一个新的工作树，基于 main 分支,这个分支会基于main分支最新的 commit
git worktree add -b claude ../claude main
# 创建codex分支
git worktree add -b codex ../codex main
```
现在的目录结构如下：
```bash
/path/mycode   # 主工作树，main 分支
/path/claude  # Claude agent  
/path/codex    # Codex agent
```


## 使用工作树
1. 在 claude 目录中进行 Claude agent 的开发
```bash
# 进入新的工作树目录
cd ../claude
# 查看当前分支
git branch
# 进行开发和提交
# 添加文件
git add .
# 提交更改
git commit -m "Claude agent development"
```
**在codex 中开发同上**


2. 在 main 目录中进行主分支的合并 merge
```bash
# 进入主工作树目录
cd ../mycode

# 切换回 main 分支 默认已经在 main 分支则不需要切换
#git checkout main
# 合并 claude 分支的更改
git merge claude
# 解决冲突（如果有）
# 提交合并结果
git commit -m "Merge Claude agent changes into main"
```

3. 后续继续在 claude 和 codex 分支中进行开发时，需要让 main 分支的最新更改同步到各自的工作树中，可以使用以下命令：
```bash
# 在主工作树中拉取最新更改,保持 main 分支是最新的,如果不需要可以不拉取
cd /path/mycode
git pull origin main

# 在 claude 工作树中切换到 claude 分支，使用 rebase 将 main 分支的更改应用到 claude 分支
cd ../claude
git rebase main
```

**以上步骤在团队开始时，可能需要变更**
例如，main分支有团体成员的提交后，需要先拉取 main 分支的最新更改，再在 claude 和 codex 分支中进行 rebase。



## 清理工作树
当不再需要某个工作树时，可以使用以下命令将其删除：
```bash
# 删除 claude 工作树
git worktree remove ../claude
# (可选) 删除 claude 分支（如果不再需要）
git branch -d claude
```