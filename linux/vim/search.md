# 搜索
> 搜索内容
```shell script
/word   

/foo\c  # \c大小写不敏感，默认是大小写敏感的

n 向下搜索
N 向上搜索

:n1,n2s/word1/word2/g   n1 与 n2 为数字.在第 n1 与 n2 行之间寻找 word1 这个字符串,并将该字符串取代为 word2 
举例来说,在 100 到 200 行之间搜寻 vbird 并取代为 VBIRD 则:[:100,200s/vbird/VBIRD/g].

:1,$s/word1/word2/g	 从第一行到最后一行寻找 word1 字符串,并将该字符串取代为 word2 

:1,$s/word1/word2/gc  从第一行到最后一行寻找 word1 字符串,并将该字符串取代为 word2 且在取代前显示提示字符给用户确认 (confirm) 是否需要取代

```
