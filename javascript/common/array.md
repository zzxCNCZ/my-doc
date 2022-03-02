---
tags:
  - js array
---
# 数组
> js array 对象操作

## 查找
```javascript

```
> find()方法主要用来返回数组中符合条件的第一个元素（没有的话，返回undefined）
> filter()方法主要用来筛选数组中符合条件的所有元素，并且放在一个新数组中，如果没有，返回一个空数组
> map()方法主要用来对数组中的元素调用函数进行处理，并且把处理结果放在一个新数组中返回（如果没有返回值，新数组中的每一个元素都为undefined）
> forEach()方法也是用于对数组中的每一个元素执行一次回调函数，但它没有返回值（或者说它的返回值为undefined，即便我们在回调函数中写了return语句，返回值依然为undefined）


## 两数组叠加
```javascript
arry1 = ['2','1']
array2 = ['3','4','5']
arry1.concat(array2)
```

## 去重
- array 去重
```javascript
// 使用set去重
userIds = ['1','1','2','2','3']
Array.from(new Set(userIds))
```
- array 对象去重
```javascript
// 根据 age 去重
// 方法一

const arr = [
  {
    name: 'zhangsan',
    age: 12
  },
  {
    name: 'lisi',
    age: 14
  },
  {
    name: 'zhangsan',
    age: 12
  },
  {
    name: 'lisi',
    age: 14
  },
  {
    name: 'zhangsan',
    age: 12
  }
]
const age = 'age'
const r = arr.reduce((all, next) => all.some((atom) => atom[age] == next[age]) ? all : [...all, next], [])
console.log(r)

```

## 删除元素
> splice该方法会改变原始数组
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
> slice 该方法并不会修改数组，而是返回一个子数组
```javascript

stringObject.slice(start,end)
// return 一个新的字符串。包括字符串 stringObject 从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
```
## 其他

### 模拟队列，数组操作
```javascript
// 先进先出 - 队列效果
const arr = [];
arr.unshift(1);
arr.unshift(2);
arr.unshift(3);
arr.unshift(4);
// 此时数组arr= [4, 3, 2, 1]
//把最后一位移出来
arr.pop()
//此时arr = [4, 3, 2]，达到先进来的数据为1，先出去为1

// 先进后出 - 堆栈效果
const arr1 = [];
arr1.push(1);
arr1.push(2);
arr1.push(3);
arr1.push(4);
// 此时arr1 =  [1, 2, 3, 4]
arr1.pop() 
// 此时arr1= [1, 2, 3]
// 达到先进后出的效果， 1最早进来，最后出去

```
