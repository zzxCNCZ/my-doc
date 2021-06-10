# mysql安装及配置

#### mysql普通安装
- ubuntu下通过源安装
```bash
sudo apt-get install mysql-server
```
- 安装好MySQL后，修改如下文件
```bash
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
# 如果为只读：sudo chmod 777 mysqld.cnf
# 修改完再改回：sudo chmod 644 mysqld.cnf
# 找到bind-address = 127.0.0.1，将绑定地址改成0.0.0.0
```

- 然后启动MySQL服务，或者在启动服务的前提下重启服务

```bash
#（脚本启动）或者service mysqld start（命令启动）     
sudo /etc/init.d/mysql start   
# 脚本重启）或者 service mysqld restart（命令重启）                          
sudo /etc/init.d/mysql restart
```
- 登录MySQL
```bash
sudo mysql -u root -p
mysql -u root -p -h 127.0.0.1
```
- 输入密码，进入MySQL命令行，在MySQL命令行中执行下列命令
```bash
# 添加权限（授权所有权限给root）
grant all PRIVILEGES on *.* to root@'%' identified by 'onePassword' with grant option;
# onePassword  自己的密码
# 刷新权限
flush privileges;
# 查看权限
 SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
# mysql 8.0
# 授权所有权限给root
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;
```
- 最后执行以下命令，重新启动MySQL服务
```bash
# 脚本重启
sudo /etc/init.d/mysql restart
# 或者 命令重启
service mysqld restart
```
- 完全卸载mysql
```bash
sudo apt-get remove mysql-*

dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P

```
#### mysql docker安装
- 编辑docker-compose.yml
```dockerfile
version: '3'
services:
  db:
    image: mysql
    # 容器名
    container_name: mysql 
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci  --sql_mode="" --log-bin-trust-function-creators=1 --max_connections=1024
    restart: always
    environment:
      #root管理员用户密码
      MYSQL_ROOT_PASSWORD: rootpwd 
      MYSQL_USER: test   #创建test用户
      MYSQL_PASSWORD: testpwd
      TZ: Asia/Shanghai
    security_opt:
       - seccomp:unconfined
    ports:
       #host物理直接映射端口为6666
       - '6666:3306'  
    volumes:
      #mysql数据库挂载到host物理机目录/e/docker/mysql/data/db
       - "./data/mysql:/var/lib/mysql"
      #容器的配置目录挂载到host物理机目录/e/docker/mysql/data/conf
       - "./data/config/mysql:/etc/mysql/conf.d"
```
## mysql 数据库创建、权限、用户配置

#### mysql8创建数据库及用户
```sql
# 创建admin 数据库
CREATE DATABASE `admin` DEFAULT CHARACTER SET utf8mb4  COLLATE utf8mb4_unicode_ci;

# 创建test用户 并可以远程连接  密码为123456
create user 'test'@'%' identified by '123456';

# 授予权限  此处为授予patrol数据库的所有权限  （一般用此项即可）
grant all privileges on admin.* to 'test'@'%';

# 如果只想授予部分权限则
grant select,update on admin.*   to 'test'@'%';

# 授权test用户拥有所有数据库的某些权限
grant select,delete,update,create,drop on *.* to test@"%" identified by "123456";

# 刷新权限
flush privileges;

```
#### mysql删除用户及权限操作
```sql
Delete FROM user Where User='test' and Host='localhost';

flush privileges;   
drop database testDB; //删除用户的数据库
drop user 用户名@'%'; //删除账户及权限
drop user 用户名@ localhost;  

# 关闭root远程只需删除root远程账户即可；
drop user root@'%';
```
#### 修改用户密码
```
update mysql.user set password=password('newpwd') where User="test" and Host="localhost";

flush privileges;
```

## mysql常见error code

#### 2059
```sql
ALTER  USER  'root'  IDENTIFIED  WITH  mysql_native_password  BY  'pwd'; 
#刷新权限 
FLUSH PRIVILEGES; 
```
#### 1129
```bash
# 查找 mysqladmin
whereis mysqladmin

# 执行命令
mysqladmin -u root -p flush-hosts 
```
#### 1418
> 原因：这是我们开启了bin-log我们就必须为我们的function指定一个参数
[reference1](https://dev.mysql.com/doc/refman/8.0/en/stored-programs-logging.html)
[reference2](https://blog.csdn.net/lv_hang515888/article/details/78094889)
```sql
set global log_bin_trust_function_creators=1;
```
或者 比如指定函数类型
例如添加
```
1 DETERMINISTIC 不确定的 
2 NO SQL 没有SQl语句，当然也不会修改数据 
3 READS SQL DATA 只是读取数据，当然也不会修改数据 
4 MODIFIES SQL DATA 要修改数据 
5 CONTAINS SQL 包含了SQL语句
```
#### 1205
>  锁问题 Lock wait timeout exceeded;
```sql
# 查找出锁线程
SELECT * FROM innodb_lock_waits;

# kill掉对应线程id
KILL 16371
```

### 1040
> Too many connections
> connection 太少的问题(mysql 默认允许连接数量较少，需要手动设置max_connection参数)
```sql
# 登录并查看最大连接数
mysql -u -root -p

SHOW VARIABLES LIKE 'max_connections';

# 默认为151
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 151   |
+-----------------+-------+


# 需要修改配置文件，使参数生效，如果直接配置如：SET GLOBAL max_connections = 1024; 重启mysql 会失效

# 修改/ect/mysql/my.cnf
vi /ect/mysql/my.cnf
max_connections = 1024

# 如果使用docker 启动的mysql，则可以直接添加环境参数

--max_connections=1024
```
