# k8s基础及原理
> k8s 因何而生，相关技术由来

#### Docker起源
云计算时代兴起了一众Pass项目，Pass项目因其应用托管的能力，使用户摆脱了以往自己部署应用到物理机器的流程。
但部署到云上，会有本地环境跟云上环境不一致的问题，开源Pass项目就是为解决这个问题而生的。Pass项目的核型技术即为
提供一套应用打包和分发机制。以Cloud Foundry为代表的Pass项目调用操作系统的 Cgroups 和 Namespace 机制生成应用
的隔离机制，俗称"沙盒",也就是容器。Docker容器亦依此而生。
2013年3月docker发布第一个版本，因其docker镜像的特性解决了以往应用打包繁杂的过程，且与Cloud Foundry为代表之类的
容器相比较，简单且不受运行环境的影响，不需要正对生产环境定制打包过程。

#### Docker容器核心
容器技术及沙盒技术，核心即为应用创造边界，使应用运行不互相干扰,也方便在多出运行。应用即我们常用的程序，程序未执行之前
只是二进制文件，也叫代码的可执行镜像（executable image),当运行起来后即系统中的进程。容器技术的核心即使用Cgroups 
和 Namespace技术约束和修改进程的动态表现，从而为其创造出一个“边界”。对于 Docker 等大多数 Linux 容器来说，
Cgroups 技术是用来制造约束的主要手段，而 Namespace 技术则是用来修改进程视图的主要方法.

#### Namespace 技术
在Linux系统中，每个进程都有一个唯一id，即pid。Linux系统启动从BIOS开始,然后由Boot Loader载入内核，并初始化内核,
内核初始化的最后一步即启动init进程，也就是系统的第一个进程。init进程，也叫超级进程，它是所有进程的父进程。
Linux系统启动过程:
![Linux.jpg](https://chevereto.zhuangzexin.top/images/2020/12/29/Linux.jpg)
运行代码：
```shell
$ docker run -it mycontainer /bin/sh
/ #
```
在执行代码
```shell script
/ # ps
PID  USER   TIME COMMAND
  1 root   0:00 /bin/sh
  10 root   0:00 ps
```
可以看到/bin/sh为mycontainer容器的第一个进程，但事实上它仍然是宿主机上的一个进程。这种机制实现了对隔离应用的
进程空间进行重新分配。这种技术即为Namespace技术。
Namespace技术其实是Linux创建系统进程的一个参数，在 Linux 系统中创建线程的系统调用是 clone()。
```shell script
int pid = clone(main_function, stack_size, SIGCHLD, NULL); 
```
而当我们用 clone() 系统调用创建一个新进程时，就可以在参数中指定 CLONE_NEWPID 参数
```shell script
int pid = clone(main_function, stack_size, CLONE_NEWPID | SIGCHLD, NULL); 
```
这样新创建的进程就会看到一个新的进程空间，这种就是Linux系统的PID Namespace,Linux 操作系统还提供了 Mount、UTS、IPC、Network 
和 User 这些 Namespace。
比如，Mount Namespace，用于让被隔离进程只看到当前 Namespace 里的挂载点信息；Network Namespace，
用于让被隔离进程看到当前 Namespace 里的网络设备和配置。
- Linux 支持7种namespace:
1. cgroup用于隔离cgroup根目录;
2. IPC用于隔离系统消息队列;
3. Network隔离网络;
4. Mount隔离挂载点;
5. PID隔离进程;
6. User隔离用户和用户组;
7. UTS隔离主机名nis域名。

#### Cgroups 技术
namespace解决可见性问题，cgroup解决资源隔离问题
Linux Cgroups 的全称是 Linux Control Group。它最主要的作用，就是限制一个进程组能够使用的资源上限，包括 CPU、内存、磁盘、网络带宽等等。
在 Linux 中，Cgroups 给用户暴露出来的操作接口是文件系统，即它以文件和目录的方式组织在操作系统的 /sys/fs/cgroup 路径下。


####  Docker Engine 在不同平台的实现
Linux 原生支持容器，Docker Engine 构建在 Linux 内核提供的容器技术上。需要注意的是此容器技术有别于虚拟技术，容器运行时有如 Linux 上的一个进程，执行效率接近于原生应用。<br>
Docker for Windows 在 Windows 10 利用其自带的 Linux 子系统来支持原生的 Linux 容器。Windows Subsystem for Linux 2 (WSL2) 一般 2 秒启动，之前 Docker 使用虚拟机的情况下 10 秒启动。<br>
Docker for Mac 在 macOS 下以轻量级虚拟机（HyperKit）的形式运行一台优化过的 Linux 虚拟机，作为 Docker Engine 的虚拟机。<br>

####  宿主机启动一个docker容器实际进行的操作为
- 启用 Linux Namespace 配置；
- 设置指定的 Cgroups 参数；
- 切换进程的根目录（Change Root）。
