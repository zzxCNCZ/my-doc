# mysql常用操作

## mysql创建sequence
> 由于没有oracle直接创建sequence的功能，mysql自带自增id的sequence功能有时候不能满足自定义sequence的功能，所以需要自建sequence.
> 例如：使用version控制数据版本，多条记录为同一版本，但又希望版本号为自增id时，自定义sequence就很需要了。
1. 新建序列表
```sql
drop table if exists sequence;   
create table sequence (       
seq_name        VARCHAR(50) NOT NULL, -- 序列名称       
current_val     INT         NOT NULL, -- 当前值       
increment_val   INT         NOT NULL    DEFAULT 1, -- 步长(跨度)       
PRIMARY KEY (seq_name)   ); 
```
2. 新增一个序列 exp: 例如建立一个序列给 te_drive表
```sql
INSERT INTO sequence VALUES ('seq_drive', '0', '1');
```
3. 创建 函数 用于获取序列当前值(v_seq_name 参数值 代表序列名称)
```sql
create function currval(v_seq_name VARCHAR(50))   
returns integer(11) 
begin
 declare value integer;
 set value = 0;
 select current_val into value  from sequence where seq_name = v_seq_name;
   return value;
end;
```
4. 查询当前值
```sql

select currval('seq_drive');

```
5. 创建 函数 用于获取序列下一个值(v_seq_name 参数值 代表序列名称)
```sql

delimiter #
create function nextval (v_seq_name VARCHAR(50)) returns integer
begin
    update sequence set current_val = current_val + increment_val  where seq_name = v_seq_name;
	return currval(v_seq_name);

# 或者
create function nextval (v_seq_name VARCHAR(50)) returns integer(11) 
begin
    update sequence set current_val = current_val + increment_val  where seq_name = v_seq_name;
	return currval(v_seq_name);
end;

```
6. 查询下一个值
```sql
select nextval('seq_drive');
```
7. 使用触发器，当表插入数据时，使用序列。exp: 新建te_drive表
```sql

DROP TABLE IF EXISTS `te_drive`;
CREATE TABLE `te_drive` (
  `name` varchar(255) NOT NULL,
  `value` double(255,0) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
);
```
8. 新建触发器 插入新纪录前给自增字段赋值实现字段自增效果\
> （若执行失败，在语句前加 delimiter &&即可，一般情况下，mysql默认以";"结束执行语句。在创建触发器时若有执行语句列表则用";"分割语句，此时就要用到delimiter语句了）
```sql
CREATE TRIGGER `TRI_drive_seq` BEFORE INSERT ON `te_drive` FOR EACH ROW BEGIN
set NEW.num = nextval('seq_drive');
END

```
