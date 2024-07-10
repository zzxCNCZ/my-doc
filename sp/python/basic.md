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