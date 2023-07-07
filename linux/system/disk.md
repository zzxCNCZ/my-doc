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