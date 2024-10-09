# 语法
##  join
![image.png](https://chevereto.zhuangzexin.top/images/2021/06/17/image.png)

## 分页语法
- 下一页
```sql
SELECT * FROM foo WHERE id> 4 ORDER BY id LIMIT 1;
```
- 上一页
```sql
SELECT * FROM foo WHERE id <4 ORDER BY id DESC LIMIT 1;
```
- 第一页的前10条记录
```sql
SELECT * FROM foo WHERE id> 4 ORDER BY id LIMIT 0, 10;
```

- 第二页的前10条记录
```sql
SELECT * FROM foo WHERE id> 4 ORDER BY id LIMIT 10, 10;
```


## 时间语法
- 时间格式化
```sql
date_format(time, '%Y-%m-%d %H:%i:%s')
```
## 时间比较
-  时间字符串转时间
```sql
Date(dateStr)
```
-  时间转字符串
```sql
str_to_date(date,'%Y-%m-%d')
```
## in和exists
- in 
注意，in所对应的select语句返回的结果一定是一列！可以为多行。
```sql
select * from table1 
where id [not] in (select id from table2 );

```
- exists
对外表用loop逐条查询，每次查询都会查看exists的条件语句。
当 exists里的条件语句能够返回记录行时(无论记录行是多少，只要能返回)，条件就为真 , 返回当前loop到的这条记录。反之如果exists里的条件语句不能返回记录行，条件为假，则当前loop到的这条记录被丢弃。
exists的条件就像一个boolean条件，当能返回结果集则为1，不能返回结果集则为 0。
```sql
select * from table1 
where [not] EXISTS (select id from table2 where id = table1.id )
```
> 如果查询的两个表大小相当，那么用in和exists差别不大。
> 如果两个表中一个较小，一个是大表，则子查询表大的用exists，子查询表小的用in。
> mysql中的in语句是把外表和内表作hash 连接，而exists语句是对外表作loop循环，每次loop循环再对内表进行查询。一直大家都认为exists比in语句的效率要高，这种说法其实是不准确的。这个是要区分环境的。   如果查询的两个表大小相当，那么用in和exists差别不大。
