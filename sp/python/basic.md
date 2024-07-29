# Python基础入门

## virtualenv
> “独立”的Python运行环境
- 安装
```bash
pip3 install virtualenv
```
- 激活venv
```bash
cd myproject
virtualenv --no-site-packages venv
# 会在项目下生成一个venv文件夹
# --no-site-packages 参数作用为已经安装到系统Python环境中的所有第三方包都不会复制过来
source venv/bin/activate 
# 使用source进入该环境
```
- 取消激活
```bash
deactivate
```

## pyenv  
automatic  installer:
```bash
curl https://pyenv.run | bash
```

使用按照包安装python
```bash
mv  Python-3.10.12.tar.xz ~/.pyenv/cache

# 安装   注:安装python需要安装必要依赖
pyenv install 3.10.12

# 设置全局版本
pyenv global 3.10.12

# 使用 virtualenv插件初始化 虚拟 环境
# pyenv virtualenv <python_version> <env_name>

pyenv virtualenv 3.10.12 myenv


# 环境变量配置，使进入shell初始化pyenv&pyenv-virtualenv 环境
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"


# 进入目录自动激活pyenv，创建.python-version，pyenv-virtualenv会识别此文件，并在进入目录时，自动激活虚拟环境
echo "myenv" > .python-version


# 手动激活虚拟环境
pyenv activate myenv

# 停用虚拟环境
pyenv deactivate
```


## Python部署
- Dockerfile
```dockerfile
# 基于镜像基础
FROM python:3.7
# 设置代码文件夹工作目录 /app
WORKDIR /app
# 先添加req
ADD ./requirements.txt /app/requirements.txt
# 安装所需的包
RUN pip install -r requirements.txt
# 复制当前代码文件到容器中 /app
ADD . /app
# Run main.py when the container launches
CMD ["python", "main.py"]
```

## Python lib依赖
- 生成requirements.txt
```bash
pip freeze > requirements.txt
```

## 镜像设置
临时使用镜像下载:



```bash
pip install package-name --index-url https://mirrors.sustech.edu.cn/pypi/web/simple

```

[下载镜像设置](https://mirrors.sustech.edu.cn/help/pypi.html#_2-configure-index-url)


## Reference
[PYPI package搜索](https://pypi.org/)