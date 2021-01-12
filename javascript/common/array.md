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

## 删除元素
> 该方法会改变原始数组
> arrayObject.splice(index,howmany,item1,.....,itemX)

| 参数    | 描述           |
| ------------- |:-------------:| 
| index      | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。 |
| howmany      | 必需。要删除的项目数量。如果设置为 0，则不会删除项目。      |  
| item1, ..., itemX | 可选。向数组添加的新项目。      |  
```javascript
// 删除a
const list = ['a','b','c']
list.splice(list.indexOf('a'), 1)
// 删除name为a 的集合
const options = [{id: '1',name:'a'},{id: '2',name:'b'},{id: '3',name:'b'}]
options.splice(options.findIndex(item => item.id === '1'), 1)
// 原来的数组
const array = ["one", "two", "four"];
// splice(position, numberOfItemsToRemove, item)
// 拼接函数(索引位置, 要删除元素的数量, 元素)
array.splice(2, 0, "three");
// 现在数组是这个样子 ["one", "two", "three", "four"]
```
