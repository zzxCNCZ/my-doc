# mysql常用操作

## mysql 实现递归查询
> oracle中使用start with connect by prior 可以直接实现递归查询，mysql没有直接递归查询方法，需要稍微复杂的方法才能实现
> 一般对于以下类似的数据结构可以实现递归查询
```sql
DROP TABLE IF EXISTS `sys_region`;
CREATE TABLE `te_tree`  (
  `id` int(50) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `parent_id` int(50) NOT NULL COMMENT '父节点ID',
  `del_flag` int(1) NULL DEFAULT 0 COMMENT '0:正常 1废弃',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 182 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '树形结构表' ROW_FORMAT = Dynamic;

```
### 创建自定义函数实现递归查询
> 注意：
> 1.创建函数的时候，可能会报错。This function has none of DETERMINISTIC 在MySQL安装根目录个人配置文件my.ini中添加一行：log_bin_trust_function_creators=1    然后重启MySQL服务。
> 2.创建函数的时候用到了系统函数GROUP_CONCAT()，该函数默认长度是1024，在配置文件my.ini 中修改默认长度，添加一行语句：group_concat_max_len=102400    保存后重启MySQL服务。查询sql SELECT @@global.group_concat_max_len;
> 3.这种方式实现之后，调用简单，但是效率较慢，而且由于字段 、函数、 长度的的限制，数据量大的时候可能查询不全。适合小数据量下使用。
- 查询子节点的函数 查询时  包含自身
```sql
-- 查询子节点的函数  查询时包含自身
CREATE DEFINER=`root`@`localhost` FUNCTION `getTreeChildListSelf`(pid VARCHAR(15)) RETURNS varchar(20000) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(20000);
DECLARE sTempChd VARCHAR(20000);
 
SET sTemp='$';
SET sTempChd = pid;
 
WHILE sTempChd IS NOT NULL DO
 
SET sTemp= CONCAT(sTemp,',',sTempChd);
SELECT GROUP_CONCAT(id) INTO sTempChd FROM te_tree WHERE FIND_IN_SET(parent_id,sTempChd)>0 and del_flag = 0;
 
END WHILE;
RETURN sTemp;
END  
```
- 查询子节点的函数 查询时  不包含自身
```sql
-- 查询子节点的函数 查询时  不包含自身
CREATE DEFINER=`root`@`localhost` FUNCTION `getTreeChildList`(pid VARCHAR(15)) RETURNS varchar(21840) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(21840);
DECLARE sTempChd VARCHAR(21840);
 
SET sTemp='$';
SET sTempChd = pid;
 
WHILE sTempChd IS NOT NULL DO
 
if sTempChd != pid then 
	SET sTemp= CONCAT(sTemp,',',sTempChd);
end if;
						
SELECT GROUP_CONCAT(id) INTO sTempChd FROM te_tree WHERE FIND_IN_SET(parent_id,sTempChd)>0 and del_flag = 0;
 
END WHILE;
RETURN sTemp;
END
```
- 查询父节点  查询的时候  包含自身
```sql
-- 查询父节点  查询的时候 包含自身
 
CREATE DEFINER=`root`@`localhost` FUNCTION `getTreeParentListSelf`(pid VARCHAR(15)) RETURNS varchar(21840) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(21840);
DECLARE sTempChd VARCHAR(21840);
 
SET sTemp='$';
SET sTempChd = pid;
 
-- SET sTemp = CONCAT(sTemp,',',sTempChd);
-- SELECT IFNULL(parent_id,'') INTO sTempChd FROM te_tree  WHERE id = sTempChd;
 
WHILE (sTempChd <> '' ) DO
 
SET sTemp = CONCAT(sTemp,',',sTempChd);
select ifnull((SELECT parent_id FROM te_tree  WHERE id = sTempChd),'')  INTO sTempChd ;
 
END WHILE;
 
RETURN sTemp;
END

```
- 查询父节点  查询的时候  不包含自身
```sql
-- 查询父节点   查询的时候  不包含自身
CREATE DEFINER=`root`@`localhost` FUNCTION `getTreeParentList`(pid VARCHAR(15)) RETURNS varchar(21840) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(21840);
DECLARE sTempChd VARCHAR(21840);
 
SET sTemp='$';
SET sTempChd = pid;
 
-- SET sTemp = CONCAT(sTemp,',',sTempChd);
-- SELECT IFNULL(parent_id,'') INTO sTempChd FROM te_tree  WHERE id = sTempChd;
 
WHILE (sTempChd <> '' ) DO
 
if sTempChd != pid then 
	SET sTemp = CONCAT(sTemp,',',sTempChd);
end if;
 
	
select ifnull((SELECT parent_id FROM te_tree  WHERE id = sTempChd),'')  INTO sTempChd ;
 
END WHILE;
 
RETURN sTemp;
END

```
### MySQL 8.0 版本以上 使用 WITH RECURSIVE 实现递归
- 查询子节点  含自己
```sql
 -- 查询子节点  含自己
 WITH RECURSIVE recursion (id, name, parent_id, del_flag) AS
(
  SELECT T1.id, T1.name, T1.parent_id, T1.del_flag  
	  from te_tree T1
	 where T1.id='-1'
  UNION ALL
	
  SELECT T2.id, T2.name, T2.parent_id, T2.del_flag 
    from te_tree T2, recursion T3
	 WHERE T2.parent_id=T3.id
)
SELECT T.id, T.name, T.parent_id, T.del_flag  
  FROM recursion T
	;
```
- 查询子节点  不含自己
```sql
 -- 查询子节点   不含自己
 WITH RECURSIVE recursion (id, name, parent_id, del_flag) AS
(
  SELECT T1.id, T1.name, T1.parent_id, T1.del_flag  
	  from te_tree T1
	 where T1.id='-1'
  UNION ALL
	
  SELECT T2.id, T2.name, T2.parent_id, T2.del_flag 
    from te_tree T2, recursion T3
	 WHERE T2.parent_id=T3.id
)
SELECT T.id, T.name, T.parent_id, T.del_flag  
  FROM recursion T
  where T.id!='-1'
	;
```
- 查询父节点  含自己
```sql

 -- 查询父节点  含自己
 WITH RECURSIVE recursion (id, name, parent_id, del_flag) AS
(
  SELECT T1.id, T1.name, T1.parent_id, T1.del_flag  
	  from te_tree T1
	 where T1.id='-1'
  UNION ALL
	
  SELECT T2.id, T2.name, T2.parent_id, T2.del_flag 
    from te_tree T2, recursion T3
	 WHERE T2.id=T3.parent_id
)
SELECT T.id, T.name, T.parent_id, T.del_flag  
  FROM recursion T
	;
```
- 查询父节点  不含自己
```sql
 WITH RECURSIVE recursion (id, name, parent_id, del_flag) AS
(
  SELECT T1.id, T1.name, T1.parent_id, T1.del_flag  
	  from te_tree T1
	 where T1.id='-1'
  UNION ALL
	
  SELECT T2.id, T2.name, T2.parent_id, T2.del_flag 
    from te_tree T2, recursion T3
	 WHERE T2.id=T3.parent_id
)
SELECT T.id, T.name, T.parent_id, T.del_flag  
  FROM recursion T
  where T.id!='-1'
	;
```


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
2. 新增一个序列 e.g., 例如建立一个序列给 te_drive表
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
7. 使用触发器，当表插入数据时，使用序列。e.g., 新建te_drive表
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
