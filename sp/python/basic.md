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


# pypi usage
