# uv
> python 包管理
> An extremely fast Python package and project manager, written in Rust.
> https://docs.astral.sh/uv/


### uv 安装
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### uv 常用指令
```bash
# 创建新项目
uv init my-project

# cd my-project

# 安装依赖
uv add requests

# 查看已安装依赖
uv list

# 卸载依赖
uv remove requests

# 锁定依赖
uv lock

```

### mise + pdm + uv 集成

| 工具       | 最佳作用                          | 为什么需要它                                 |
| -------- | ----------------------------- | -------------------------------------- |
| **mise** | 统一管理 Python 版本、全局工具（如 uv、pdm） | 对团队最友好，不同项目切换环境秒级，避免 pyenv 慢、conda 重   |
| **PDM**  | 项目级依赖管理、锁定、构建、虚拟环境            | 现代 PEP 582 支持、pyproject 管理比 poetry 更灵活 |
| **uv**   | **极致加速**：安装依赖、同步锁定、运行         | 比 pip/pip-tools 快一个数量级；与 pdm 完全兼容      |


```bash
# 安装 mise
curl https://mise.run | sh

#在 mise 中声明 Python & 工具
# 在 $HOME/.config/mise/config.toml
[tools]
python = "3.12.12"
pdm = "latest"
uv = "latest"

# 运行 安装组件
mise install
# 使用指定版本
mise use -g python@3.12 uv@latest pdm@latest
# 验证
mise ls

# 初始化项目
pdm init

# 查看配置
pdm  config
```

#### 项目级配置
```bash
# .mise.toml
[tools]
python = "3.12.12"
pdm = "latest"
uv = "latest"


#使用uv替代 pdm install 加速
# 全局配置
vim $home/.config/pdm/config.toml

use_uv = true



# 安装所有依赖
pdm install

# 安装依赖
pdm add requests


# 安装开发依赖
pdm add -d pytest black ruff


#导出 requirements（用于 docker 构建）
# pdm 管理时的导出方式
# pdm export -f requirements --without-hashes -o requirements.txt

# 使用uv管理包时，需要使用uv导出
uv export --format requirements-txt > requirements.txt

# 不添加注释等
uv export --format requirements-txt --no-hashes --no-dev --no-annotate --no-header -o requirements.txt


# 同步锁定文件
pdm sync


# 配置镜像源&超时时间  再执行 pdm install
export UV_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple

# 增加超时时间（NVIDIA CUDA 包很大，需要更长时间）
export UV_HTTP_TIMEOUT=300


# 查看安装依赖列表
pdm list

```


#### 工作流
| 场景           | 推荐命令                      |
| ------------ | ------------------------- |
| 初始化项目        | `pdm init`                |
| 添加依赖         | `pdm add xxxx`            |
| 安装所有依赖       | `pdm install`             |
| 运行脚本         | `uv run python script.py` |
| 测试           | `uv run pytest`           |
| 清理虚拟环境       | `pdm venv remove <name e.g. in-project>`         |
| 创建虚拟环境       | `pdm venv create`         |
| 切换 Python 版本 | `mise use python@3.12`    |
| 锁定           | `pdm lock`                |

#### Reference
[pdm use uv](https://pdm-project.org/latest/usage/uv/)