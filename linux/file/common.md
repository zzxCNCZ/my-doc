# common
> 常规操作

### 列出文件列表 ls ll
```shell script
ls  -a 显示所有   -l 长格式显示
ll
```
### 目录跳转 cd
```shell script
cd / 进入根目录
cd .. 进入上级目录
cd ～ 回到home目录
```
### 文件夹（文件）操作 mkdir rm 
```shell script
# 创建文件夹
mkdir 
# 创建文件
touch fileName 
# 删除文件或文件夹
rm -rf fileName/dirName 删除文件或文件夹
# 删除文件夹下所有内容
rm -rf dirName/*  
# 授权文件或文件夹   
# 777的权限就是：rwxrwxrwx   r(读):4 w(写):2 x(执行):1  所有者+同组用户+公共用户 
# 一般设置 777，755，644。755：同组用户和公共用户可读可执行。  644：所有者可读写，同组用户和公共用户可读。
chmod 777 fileName 给文件设置权限

# 授权文件或文件夹用户组
chown -R root:root  fileName
```
