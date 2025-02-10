# conda
> conda 是一个开源的软件包管理系统和环境管理系统，通常用于 Python 和 R 语言。

### conda install
[install](https://anaconda.org.cn/anaconda/install/)
1. download install package

2. install

```bash
chmod +x Anaconda3-2024.10-1-Linux-x86_64.sh

./Anaconda3-2024.10-1-Linux-x86_64.sh

```


### conda 常用指令
```bash
# 创建环境
conda create --name myenv python=3.12

# 激活环境

conda activate myenv

# 停用环境
conda deactivate

# 查看现有环境
conda env list


# 安装 package
conda install package_name

# 删除 package
conda remove package_name


# 导出环境
conda env export > environment.yml

# 导入环境
conda env create -f environment.yml

```


### conda 镜像源
```bash
# 清华
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/linux-64/
conda config --set show_channel_urls yes

```