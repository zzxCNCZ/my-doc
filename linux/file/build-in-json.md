# 内置对象 JSON

::: tip JSON 的规格

1. 并列的数据之间用逗号（", "）分隔。
2. 映射用冒号（": "）表示。
3. 并列数据的集合（数组）用方括号("[]")表示。
4. 映射的集合（对象）用大括号（"{}"）表示。

:::

> 一直不是很清楚 JSON.parse 是把字符串转成 JSON,还是将 JSON 转成字符串。后来我就记起来了，JSON.parse 就是 parse json

## [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

parses a JSON string, constructing the JavaScript value or object described by the string

`JSON.parse(xxx,func)` 也有一个额外的参数，可以传一个函数，该函数在每一个键值对上调用

## [JSON.stringify](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

::: warning
如果数据有循环引用的情况，那么使用 `JSON.stringify` 会报错
:::

The JSON.stringify() method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

### 美化格式

可能很少有人关注它的第二个和第三个参数吧，JSON.stringify 方法一共能接受 3 个参数，其中两个可选的参数，最后一个参数（字符串或者数字）是用来格式化显示的

JSON.stringify(students, null, 4);表示用每行缩进 4 个空格的格式来格式化 stringify 后的字符串

### 筛选数据

当我们传数组给 stringify 的第二个参数(可以是一个函数，含有字符串的数组或者数字)时，其中的内容表示可序列化的属性名，而且这个设定是递归的
