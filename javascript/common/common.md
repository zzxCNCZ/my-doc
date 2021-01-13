# 常规

## 取整数
```javascript
// 转换为int '1' ->  1
const str = '1'
parseInt(str)
// result:1

const num1 = ~~20.15
const num2 = 20.15^0
// result:20

// 向上取整 Math.ceil(number)
const num3 = Math.ceil(20.1)
// result:21

// 向下取整 Math.floor(number)
const num4 = Math.floor(20.1) 
//20

```

## js去除富文本中的标签和空白
```javascript
let html = '<div style="color:red">111<span>222</span>&nbsp;&nbsp;333<a>444</a>555</div>';

html = html.replace(/<\/?.+?>/g, "");

html= html.replace(/&nbsp;/g, " ");

console.log(html);

```
