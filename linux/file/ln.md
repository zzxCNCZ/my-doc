# ln
> Linux ln命令是一个非常重要命令，它的功能是为某一个文件在另外一个位置建立一个同步的链接。 
> 当我们需要在不同的目录，用到相同的文件时，我们不需要在每一个需要的目录下都放一个必须相同的文件，
>我们只要在某个固定的目录，放上该文件，然后在 其它的目录下用ln命令链接（link）它就可以，不必重复的占用磁盘空间。

#### 语法
```bash
 ln [参数][源文件或目录][目标文件或目录]
```

#### 常用命令
```bash
# 创建软链接
ln -s oldfile  newfile

# 创建硬链接
ln oldfile  newfile


# 删除 *注意 link后面不要加 / ，会把真实目录下文件删除
rm -rf  link

# 修改
ln -snf  /var/www/test1   /var/test
```
