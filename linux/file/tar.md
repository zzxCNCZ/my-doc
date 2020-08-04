# tar & zip
> 压缩与解压

```shell script
# 打包当前文件夹下所有文件
# 压缩当前文件夹下非隐藏文件的文件
tar czvf test.tar.gz *
# 压缩当前文件夹下隐藏文件排除两个隐藏文件夹"."和“..”
tar czvf test.tar.gz  .[!.]*   

# 压缩文件夹下所有文件(注意最后的 . )
tar zcvf /test/data.tar.gz -C /some/files .
# 解压至指定目录
tar zxvf FileName.tar -C /tmp 

# 压缩
zip -q -r xahot.zip /home/wwwroot/xahot
# 解压
unzip xahot.zip
```
