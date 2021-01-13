---
tags:
  - js json
---
# json
> json 常用语法

## 修改json中的key值
```javascript
const data = [
              {count:335, goods:'直接访问'},
              {count:310, goods:'邮件营销'},
              {count:234, goods:'联盟广告'}
            ].map(function(item) {
                return {
                    name: item.goods,
                    value: item.count
                }
            });
```


## 判断json数组中是否含有值
```javascript
let arr=["a","b","c"];
let arr2={"a":"aaa","b":"bbb","c":"ccc"};

// in判断是否在数组的key里
console.log("1：","a" in arr);  // false
console.log("2：","aa" in arr);  // false
console.log("3：",2 in arr);  // true
console.log("4：",5 in arr);  // false
console.log("5：","a" in arr2);  // true
console.log("6：","aa" in arr2);  // false
// indexOf列表（字符串）是否包含
console.log("7：",arr.indexOf("c"));  // 2
console.log("8：",arr.indexOf("aa"));  // -1
console.log("9：",arr2.indexOf("b"));  //报错
console.log("10：",arr2.indexOf("aaa"));  //报错
// includes用于列表和字符串
console.log("11：",arr.includes("a"));  // true
console.log("12：",arr.includes("aa"));  // false
console.log("13：",arr2.includes("a"));  //报错
console.log("14：",arr2.includes("aa"));  //报错

```
