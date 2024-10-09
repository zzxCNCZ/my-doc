# sed
> 文件内容替换操作
```shell script
替换文件内容以 Str打头的内容为String
sed -i 's/^Str/String/' replace.java   不添加 -i 只会输出到终端
替换以‘.’ 好结尾为‘；’
sed -i 's/\.$/\;/' replace.java
替换所有 jack  为 me
sed -i 's/jack/me/g' replace.java   添加 g 会替换所有符合条件的内容，否则只匹配第一个
删除空行
sed -i '/^ *$/d' replace.java
删除带 Integer
sed -i '/Integer/d' replace.java
```


### windows下创建的脚本文件，需要转换为unix格式
```shell script
sed -i 's/\r$//' test.sh
```