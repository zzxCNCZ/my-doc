# cp

> 文件复制

```shell script
# 复制文件夹
cp -r a/.  b  
# 复制目录aaa下所有到/bbb目录下，这时如果/bbb目录下有和aaa同名的文件，需要按Y来确认并且会略过aaa目录下的子目录。
cp aaa/* /bbb 
# 这次依然需要按Y来确认操作，但是没有忽略子目录。
cp -r aaa/* /bbb 
# 依然需要按Y来确认操作，并且把aaa目录以及子目录和文件属性也传递到了/bbb。 
cp -r -a aaa/* /bbb 
#  成功，没有提示按Y、传递了目录属性、没有略过目录。
cp -r -a aaa/* /bbb
```
