# 可选链(option-chain)
> 可选链操作符是一个新的js api，它允许读取一个被连接对象的深层次的属性的值而无需明确校验链条上每一个引用的有效性。目前处于Stage 3提案阶段，暂时不可以直接使用，可以通过babel编译器使用。

## option-chain语法
```javascript
const obj = {
  foo: {
    bar: {
      baz: 42,
      fun: ()=>{}
    },
  },
};
 
// 不使用?.
let baz = obj && obj.foo && obj.foo.bar && obj.foo.bar.baz;
 
// 使用?.
let baz = obj?.foo?.bar?.baz; // 结果：42

// 语法补充 ?? 双问号语法,当 option-chain没有结果时 使用 ?? 加上默认值
let baz = obj?.foo?.bar?.bbs ?? 100  //  结果: 100
```

## option-chain使用
> 由于目前可选链仅在提案阶段，浏览器暂时还不支持，因此需要使用babel进行转化，下面，我就来介绍一下在Vue项目中适合在js和template中使用可选链提升我们编码的可读性与效率。
- npm 安装
```bash
# 双问号
npm install -D @babel/plugin-proposal-nullish-coalescing-operator
# 可选链
npm install -D @babel/plugin-proposal-optional-chaining
```
- babel.config 添加添加plugins
```javascript
plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
```
> 在template中使用
- optional-chain.js
```javascript
/**
 * 解决Vue Template模板中无法使用可选链的问题
 * @param obj
 * @param rest
 * @returns {*}
 */
export const optionalChaining = (obj, ...rest) => {
  let tmp = obj
  for (const key in rest) {
    const name = rest[key]
    tmp = tmp?.[name]
  }
  return tmp || ''
}
```
- main.js
```javascript
import { optionalChaining } from './utils/optional-chain'

Vue.prototype.$$ = optionalChaining
```
- template中使用
```javascript

{{ $$(scope.row,'userInfo', 'phone') || '-'}}
```    
