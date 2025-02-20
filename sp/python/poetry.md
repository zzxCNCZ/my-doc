# poetry
> Poetry is a dependency management tool for Python that allows you to declare, manage, and install dependencies in your projects. It simplifies the process of managing libraries and packages, making it easier to create and maintain Python projects.

### poetry 安装 
```bash
# Install Poetry curl -sSL https://install.python-poetry.org | python3 -
# Add Poetry to PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
# Check Poetry version
poetry --version
```

### poetry 常用指令
```bash
# 如果你已经有了 `pyproject.toml` 文件（就像你现在的情况），直接进入项目目录即可。如果是新项目：

poetry new my-project
# 或者在现有目录初始化
poetry init

# 安装依赖
poetry install
# 安装指定版本的依赖
poetry add requests@2.25.1

# 移除依赖
poetry remove package-name

# 更新依赖
poetry update

# 查看当前环境信息
poetry env info

# 列出所有依赖
poetry show
```