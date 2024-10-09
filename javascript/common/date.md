---
tags:
  - js date
---
# date
> date 对象常用操作

## date 默认返回
```javascript
const newDate = new Date();

// Tue Jan 12 2021 14:00:00 GMT+0800 (中国标准时间)

```

## date 格式化
- date 格式化为 yyyy:mm:dd HH:mm:ss 格式
```javascript
function formatDateToStr (yourDate) {
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
  return yourDate.toISOString().split('T')[0] + ' ' + yourDate.toISOString().split('T')[1].slice(0, 8)
}
const dateStr = formatDateToStr(new Date())
console.log(dateStr)
// 2021-01-12 15:53:43

```
-  yyyy:mm:dd HH:mm:ss 时间字符串转换date对象

```javascript
const dateStr = '2021-01-12 15:53:43'
new Date(Date.parse(dateStr.replace(/-/g, '/')))
```
## 时间比较
- 转换为date对象比较
```javascript
// 把字符串格式转化为日期类
const startTime = new Date(Date.parse('2021-01-12 15:53:43'));
const endTime = new Date(Date.parse('2021-01-13 15:53:43'));
// 进行比较
return (startTime > endTime)
```
- 时间戳比较
```javascript
// 把字符串格式转化为日期类
const startTime =Date.parse('2021-01-12 15:53:43');
const endTime = Date.parse('2021-01-13 15:53:43');
// 进行比较
return (startTime > endTime)
```

## 日期加减
```javascript
/**
 * 获取日期前一天
 * getDay(-1, '-')
 * getDay(+1, '/')
 * */
function getDay (num, str) {
  var today = new Date()
  var nowTime = today.getTime()
  var ms = 24 * 3600 * 1000 * num
  today.setTime(parseInt(nowTime + ms))
  var oYear = today.getFullYear()
  var oMoth = (today.getMonth() + 1).toString()
  if (oMoth.length <= 1) oMoth = '0' + oMoth
  var oDay = today.getDate().toString()
  if (oDay.length <= 1) oDay = '0' + oDay
  return oYear + str + oMoth + str + oDay
}
```
## 时间转换工具
```javascript
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
const d = new Date('2021-01-12 15:53:43')
// timestamp
parseTime(d)
// timestamp string
parseTime((d + ''))
// format
parseTime(d, '{y}-{m}-{d} {h}:{i}')
parseTime(d, '{y}-{m}-{d}')
parseTime(d, '{y}/{m}/{d} {h}-{i}')
// get the day of the week
parseTime(d, '{a}')
// judge null
parseTime(null)
function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // eslint-disable-next-line camelcase
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  // eslint-disable-next-line camelcase
  return time_str
}
```
