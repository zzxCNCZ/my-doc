# swap内存

### 开启swap内存(ubuntu)
1. 查看是否开启swap内存
*或者使用： cat /proc/swaps  等价于 swapon -s*
```bash
free -m

              total        used        free      shared  buff/cache   available
Mem:            981         299          76           2         606         512
Swap:           0           0              0
```
如果为 0 0 0 则表示未开启

2. 创建 Swap 文件
```bash
dd if=/dev/zero of=/swapfile count=2048 bs=1M
```
count=2048 表示创建 2G 的虚拟内存，因为这里用到的单位是 M，如果要创建 6G 虚拟内存，则把2048 改成 6144 即可，因为 1024 * 6 = 6144。

3. 激活 Swap 文件
```bash
chmod 600 /swapfile
mkswap /swapfile
```

4. 开启 Swap
```bash
swapon /swapfile
```

5. 设置系统启动时自动开启 Swap
```bash
vim /etc/fstab

# 添加如下内容
/swapfile none swap sw 0 0

```

6. 关于swap分区大小的建议(非绝对)
```
物理内存(MB)  不需要休眠  需要休眠  最大值
 256          256       512     512
 512          512       1024    1024
 1024         1024      2048    2048

物理内存(GB)  不需要休眠  需要休眠  最大值
  1          1         2        2
  2          1         3        4
  3          2         5        6
  4          2         6        8
  5          2         7        10
  6          2         8        12
  8          3         11       16
  12         3         15       24
  16         4         20       32
  24         5         29       48
  32         6         38       64
  64         8         72       128
  128        11       139       256
```

### 关闭swap内存
例如开启k8s集群的时候就需要关闭swap内存
1. 不重启电脑，禁用启用swap，立刻生效(重启后会开启)
```bash
# 禁用命令
sudo swapoff -a

# 启用命令
sudo swapon -a

```
2. 永久关闭
注释掉fstab中的swap挂载目录,重启即可
