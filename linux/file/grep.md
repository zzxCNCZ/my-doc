# grep
> 搜索文件内容
```shell script
grep -n searchValue fileName  显示包含searchValue的行，及行号
-a ：将 binary 文件以 text 文件的方式搜寻数据
-c ：计算找到 '搜寻字符串' 的次数
-i ：忽略大小写的不同，所以大小写视为相同
-n ：顺便输出行号
-v ：反向选择，亦即显示出没有 '搜寻字符串' 内容的那一行! 
进阶：
grep ‘energywise’ *           #在当前目录搜索带'energywise'行的文件
grep -r ‘energywise’ *        #在当前目录及其子目录下搜索'energywise'行的文件
grep -l -r ‘energywise’ *     #在当前目录及其子目录下搜索'energywise'行的文件，但是不显示匹配的行，只显示匹配的文件
```
