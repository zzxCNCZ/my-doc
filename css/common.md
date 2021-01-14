# common
> 常用语法

## input自动填充颜色
- 利用动画延迟
```javascript
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
	transition-delay: 99999s;
    transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-text-fill-color: #807c7c;
}

```