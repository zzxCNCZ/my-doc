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
  const [err, res] = await to(fetchUser(true))
  if (err) {
    console.error('touser err:', err)
  }
```

## Promise.all的使用
>Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，
> 而失败的时候则返回最先被reject失败状态的值。

```javascript
let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
  resolve('success')
})

let p3 = Promse.reject('失败')

Promise.all([p1, p2]).then((result) => {
  console.log(result)               //['成功了', 'success']
}).catch((error) => {
  console.log(error)
})

Promise.all([p1,p3,p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)      // 失败了，打出 '失败'
})

```
> 需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，
> 即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，
> 偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

## Promise.race的使用
> Promise.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
```javascript
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})
```
e.g., race的使用场景就是，多台服务器部署了同样的服务端代码，假如我要获取一个商品列表接口，
我可以在 race 中写上所有服务器中的查询商品列表的接口地址，哪个服务器响应快，就从哪个服务器拿数据。
