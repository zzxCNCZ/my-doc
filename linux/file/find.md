# find
> 查找文件

```shell script
find / -name 'oracle' -type d  # 查找文件夹

find  -name "*.txt" -print 用于查找所有的‘ *.txt’文件在当前目录及子目录中
find  -name "[A-Z]*" -print 用于当前目录及子目录中查找文件名以一个大写字母开头的文件
find /etc -name "host*" -print 在/etc目录中查找文件名以host开头的文件
find  -name "[a-z][a-z][0--9][0--9].txt" -print 在当前目录查找文件名以两个小写字母开头，跟着是两个数字，最后是.txt的文件

使用
1.在某目录下查找名为“elm.cc”的文件
find /home/lijiajia/ -name elm.cc
 
2.查找文件名中包含某字符（如"elm"）的文件
find /home/lijiajia/ -name '*elm*'
find /home/lijiajia/ -name 'elm*'
find /home/lijiajia/ -name '*elm'
 
3.根据文件的特征进行查询
find /home/lijiajia/ -amin -10        #查找在系统中最后10分钟访问的文件
find /home/lijiajia/ -atime -2        #查找在系统中最后48小时访问的文件
find /home/lijiajia/ -empty           #查找在系统中为空的文件或者文件夹
find /home/lijiajia/ -group cat       # 查找在系统中属于groupcat 的文件（试了，命令不对。）
find /home/lijiajia/ -mmin -5         # 查找在系统中最后5 分钟里修改过的文件
find /home/lijiajia/ -mtime -1        #查找在系统中最后24 小时里修改过的文件
find /home/lijiajia/ -nouser          #查找在系统中属于作废用户的文件（不明白是什么意思）
find /home/lijiajia/ -amin 10         #查找在系统中最后10分钟访问的文件
find /home/ftp/pub -user lijiajia     #查找在系统中属于lijiajia这个用户的文件
(PS:以上都是在 /home/lijiajia/文件夹下进行的操作)
 
4.使用混合查找方式查找文件
find /tmp -size +10000000c -and -mtime +2      #查找/tmp目录中大于10000000字节并且在48小时内修改的某个文件
find /tmp -user tom -or -user george           #查找/tmp目录中属于tom或者george这两个用户的文件
find /tmp ! -usr fred                          #查找/tmp目录中不属于fred的文件
 
5.查找并显示文件
find /home/lijiajia/ -name 'elm.cc' -ls        #在目录下查找名为“elm.cc”的文件,并显示这些文件的信
息

6.查找指定大小文件
find . -type f -size +100M   查找100M以上的文件
```
