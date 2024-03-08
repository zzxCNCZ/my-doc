# 硬盘
> 硬盘分区操作

## 查看状态 fdisk df
```shell script
# 查看所有硬盘信息
sudo fdisk -l
   
df -Th 只能看到挂载的磁盘信息(-T显示Type)

# 查看当前目录下一级子文件和子目录占用的磁盘容量
du -lh --max-depth=1 
# 检查磁盘坏道
badblocks -v /dev/sda > badsectors.txt

# 查看系统检测的硬盘 命令：
lsblk
 
```
## 挂载 mount
```shell script
# 格式化为ext4分区
mkfs.ext4 /dev/sdd1

# 挂载fat32格式U盘
mount -t vfat /dev/sda1 /media 
# 挂载ntfs硬盘
mount -t ntfs /dev/sda1 /media
# 挂载 ext4
mount -t ext4 /dev/sdd1 /dir
# 卸载u盘
sudo umount -l /media/

# 配置开机自动挂载
# 编辑
vim /etc/fstab
加入:
# 目录方式
/dev/sdb1(磁盘分区)  /data1 (挂载目录) ext3(文件格式)defaults  0  0
# 磁盘uuid方式
# 查看硬盘uuid
blkid /dev/vdb
UUID=b3c417e5-7122-474e-ad9a-c32ca225032b  /home/edu/data          ext4    defaults        0 2
# 0 代表： 0不进行备份操作 2代表：检验磁盘扇区是否完整【2代表1级别检验完成之后进行检验】
```

### 挂载虚拟磁盘
1. 查看物理卷：pvs

2. 查看卷组：vgs

3. 创建 逻辑分区（创建完成后，`fdisk -l` 会出现对应的disk，此时需要格式化分区）
```
lvcreate -L 800G -n mylv ubuntu-vg
```
4. 查看逻辑分区
```
lvdisplay

```
5. 挂载分区
```
mount /dev/myvg/mylv /mnt/mylv
```

#### 逻辑分区扩容
1. 扩容逻辑分区
```
lvextend -L +100G /dev/myvg/mylv
```
2. 扩容文件系统
```
resize2fs /dev/myvg/mylv
```

### 迁移磁盘
1. 使用dd命令迁移磁盘或者分区
```bash
# bs=4M 表示每次读取4M的数据, 默认是512字节，如果用默认的参数，会非常慢.
# 注： 迁移磁盘会把原磁盘的所有数据迁移到新磁盘，包括分区表，分区，数据等，所以新磁盘的大小要大于等于原磁盘。eg: 原磁盘是500G，新磁盘是1T.同时迁移磁盘不是按照已存在数据的大小来迁移的，而是按照磁盘的大小来迁移的。
dd if=/dev/sda of=/dev/sdb bs=4M
# 以上命令是迁移的磁盘，如果是迁移分区，需要指定分区号
dd if=/dev/sda1 of=/dev/sdb1 bs=4M
```
*注* 迁移完成后uuid跟原磁盘一样，如果是替换原磁盘，可以直接使用。

```bash
2. 迁移完成后会出现未分配的磁盘空间，需要使用工具进行分区，这里使用的是`parted`工具,gui工具有`gparted`

```bash
# 查看磁盘分区
parted /dev/sdb print free

# 将磁盘分区1扩容到最大
sudo parted /dev/sdb resizepart 1 100%

# resize2fs命令扩容文件系统,需要一定时间
sudo resize2fs /dev/sdb1
```

`2`操作不需要卸载磁盘 `1`操作需要卸载磁盘(e.g.在ubuntu live cd下操作)

**问题**
- 原磁盘是2T磁盘，为MBR分区，迁移到4T磁盘，使用`dd`命令迁移后，新磁盘只有2T大小，而且分区表也是MBR分区，无法使用4T磁盘的空间。如果要使用4T磁盘的空间，需要重新分区，一般重新分区会导致数据丢失，因为需要格式化分区。 此时可以使用DiskGenius工具，可以不丢失数据的情况下重新分区。点击`磁盘`->`转换分区表`->`GPT`->`确定`->`应用`。然后使用`parted`工具扩容分区。