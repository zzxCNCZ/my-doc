# tar & zip
> 压缩与解压


### 压缩
```bash
# 打包当前文件夹下所有文件
# 压缩当前文件夹下非隐藏文件的文件
tar czvf test.tar.gz *
# 压缩当前文件夹下隐藏文件排除两个隐藏文件夹"."和“..”
tar czvf test.tar.gz  .[!.]*   

# 压缩文件夹下所有文件(注意最后的 . )
tar zcvf /test/data.tar.gz -C /some/files .

tar zcvf data.tar -C folder/ .

```

### 解压
```shell script

# 解压至指定目录
tar zxvf FileName.tar -C /tmp 
# 解压到当前目录下的 cloud 文件夹
tar zxvf FileName.tar -C ./cloud .

```

### zip
```shell script
# 压缩
zip -q -r xahot.zip /home/wwwroot/xahot
# 解压
unzip xahot.zip
```
