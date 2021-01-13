---
tags:
  - js promise
---
# promise
> promise object
> A Promise is a JavaScript object that links "Producing Code" and "Consuming Code".
> "Producing Code" can take some time and "Consuming Code" must wait for the result.

## async / await 使用
```javascript
function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve( data )
      }, 500)
    } catch ( err ) {
      reject( err )
    }
  })
}

async function getSyncData() {
  let time = await getSyncTime()
  let data = `endTime - startTime = ${time}`
  return data
}

async function getData() {
  let data = await getSyncData()
  console.log( data )
}

getData()
```
从上述例子可以看出 async/await 的特点：
- 可以让异步逻辑用同步写法实现
- 最底层的await返回需要是Promise对象
- 可以通过多层 async function 的同步写法代替传统的callback嵌套

## 包装promise，使其返回统一的格式的代码

```javascript
/**
   * 包装promise, 使其返回统一的错误格式
   * @param {Promise} promise
   */
  function to (promise) {
    return promise.then(res => [null, res]).catch(err => [err])
  }
  .
  .
  .
  const [err, res] = await to(fetchUser(true))
  if (err) {
    console.error('touser err:', err)
  }
```
