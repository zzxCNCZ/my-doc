---
tags:
  - js array
---
# 数组
> js array 对象操作

## 两数组叠加
```javascript
arry1 = ['2','1']
array2 = ['3','4','5']
arry1.concat(array2)
```

## 去重
```javascript
// 使用set去重
userIds = ['1','1','2','2','3']
Array.from(new Set(userIds))
```
