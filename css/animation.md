---
tags:
  - 箭头动画
---
# css动画
> animation,transform 属性实现css动画

## 实现一个箭头动画
- html
```html
<div class="wrapper">
    <a href="https://doc.zhuangzexin.top" id="opener"></a>
</div>
```
- css
```css
body {
    background: #59d39c;
    color: #fff;
    font-family: sans-serif;
    text-align: center;
}
h1 {
    font-size: 100px;
    text-transform: uppercase;
}
#opener:hover {
    -webkit-transition-delay: 0;
    transition-delay: 0;
    opacity: 1;
}
#opener {
    cursor: pointer;
    width: 20px;
    height: 20px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    border-bottom: 4px solid rgb(0, 92, 255);
    border-right: 4px solid rgb(0, 92, 255);
    position: absolute;
    top: 60px;
    left: 40px;
    -webkit-animation: opener .5s ease-in-out alternate infinite;
    animation: opener .5s ease-in-out alternate infinite;
    cursor: pointer;
    opacity: 0.5;
    -webkit-transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
    transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
}
@-webkit-keyframes opener {
    100% {
        top: 65px
    }
}
@keyframes opener {
    100% {
        top: 65px
    }
}
.wrapper {
    font-size: 26px;
    float: left;
}
```
transform属性使元素旋转，animation属性实现动画。
上面代码中定义了keyframes opener,keyframes定义了元素的动画过程，属性可以为0% - 100%,0%即为初始状态，100%
即为结束状态
例如：
```css
@keyframes mymove {
  0%   {top: 0px; left: 0px; background: red;}
  25%  {top: 0px; left: 100px; background: blue;}
  50%  {top: 100px; left: 100px; background: yellow;}
  75%  {top: 100px; left: 0px; background: green;}
  100% {top: 0px; left: 0px; background: red;}
}
```
