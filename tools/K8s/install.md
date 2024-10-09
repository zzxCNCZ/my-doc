## kubernetes install

### docker install
[docker安装及配置](/tools/docker/install-setting.md)

### 配置docker镜像源及日志限制
```bash
# 配置私有镜像及日志
sudo vim /etc/docker/daemon.json

# 内容如下 ：
{
    "registry-mirrors":
    [
        "https://docker.940303.xyz"
    ],
    "insecure-registry":
    [
        "docker.940303.xyz"
    ],
    "log-driver": "json-file",
    "log-opts":
    {
        "max-size": "100m",
        "max-file": "3"
    }
}

# 重启docker
sudo service docker restart
```

### 关闭swap,关闭防火墙、selinux
Kubernetes要求在所有参与集群的节点上关闭swap。这是因为Kubernetes的调度器需要准确地了解和管理可用于Pods的内存量。如果启用了swap，那么内存的使用情况会变得不透明，从而可能影响Kubernetes调度器的决策和Pod的性能。

```bash
# 关闭
sudo swapoff -a
# 取消挂在swap
sudo vim /etc/fstab
# /swap.img	none	swap	sw	0	0
```
查看当前的防火墙服务病关闭

seLinux关闭

### kubernetes  kubelet,kubectl,kubeadm三件套
**kubeadm**   `sudo dpkg -i kubeadm_1.30.1-1.1_amd64.deb`

	- 依赖 
	- cri-tools `sudo dpkg -i cri-tools_1.30.0-1.1_amd64.deb`


`kubeadm`是一个用于快速部署Kubernetes集群的工具。它简化了集群的初始化和管理过程，让用户能够通过一组简单的命令来引导启动、加入、升级和管理集群。其主要职责包括：

- 初始化集群的控制平面节点。
- 生成用于节点加入集群所需的令牌和证书。
- 配置网络插件和其他必需的集群组件。
- 提供集群升级和维护的工具。

**kubectl**  `sudo dpkg -i kubectl_1.30.1-1.1_amd64.deb`

`kubectl`是Kubernetes集群的命令行工具，它允许开发者和管理员与集群交互。通过`kubectl`，用户可以部署应用、检查和管理集群资源以及查看日志等。其主要功能包括：

- 与Kubernetes API服务器通信，执行用户请求的操作，如创建、修改或删除资源对象（如Pods、Deployments、Services等）。
- 获取集群、资源和组件的状态信息。
- 提供调试和诊断集群问题的工具。

**kubelet** `sudo dpkg -i kubelet_1.30.1-1.1_amd64.deb`
	- 依赖
	- [socat_1.7.4.1-3ubuntu4_amd64.deb](https://launchpadlibrarian.net/592959836/socat_1.7.4.1-3ubuntu4_amd64.deb)
	- [ebtables_2.0.11-4build2_amd64.deb](https://launchpadlibrarian.net/592564296/ebtables_2.0.11-4build2_amd64.deb)
	- [conntrack_1.4.6-2build2_amd64.deb](https://launchpadlibrarian.net/592500408/conntrack_1.4.6-2build2_amd64.deb)
	- [kubernetes-cni_1.4.0-1.1_amd64.deb](https://mirrors.ustc.edu.cn/kubernetes/core%3A/stable%3A/v1.30/deb/amd64/)

`kubelet`是运行在所有集群节点上的主要“节点代理”，它负责确保容器都按照PodSpec（Pod的规范描述）运行。其主要职责包括：

- 与容器运行时（如Docker或containerd）交互，来启动或停止容器。
- 监控容器的健康状态，并根据Pod生命周期管理规则对容器进行重启、停止或销毁操作。
- 上报节点和Pod的状态信息给控制平面，以便控制平面做出调度决策或执行自动化修复。
- 处理控制平面下发的一些命令，如拉取容器镜像、挂载存储卷等。


### 安装cri-dockerd
cri-docker是一个支持CRI标准的shim（垫片），一边通过CRI跟kubelet交互，另一边跟docker api交互，从而间接的实现了kubernetes以docker作为容器运行。
**CRI** 是 Kubernetes 定义的一套标准接口，使得 Kubernetes 可以与不同的容器运行时（如 Docker、containerd、CRI-O 等）进行交互，以管理容器的生命周期。这种设计使得 Kubernetes 不直接依赖于任何特定的容器运行时，增加了系统的灵活性和可扩展性。

需要用到的离线包：[cri-dockerd_0.3.4.3-0.ubuntu-jammy_amd64.deb](https://github.com/Mirantis/cri-dockerd/releases)
	- 依赖
	- [containerd.io_1.6.9-1_amd64.deb](https://download.docker.com/linux/ubuntu/dists/focal/pool/stable/amd64/)

### 安装ipvs内核模块

IPVS (Internet Protocol Virtual Server) 是内置于Linux内核中的一种高性能负载均衡解决方案，它主要用于实现网络服务的负载均衡和分发。IPVS工作在网络的传输层，通过修改网络流量的目的地址来将请求分发到后端的服务器上。这种方式可以提高网络服务的可用性和可扩展性，同时也能提高处理请求的效率。

Kubernetes中的IPVS模式是kube-proxy的一种实现，用于服务(Service)的负载均衡。与kube-proxy的传统iptables模式相比，IPVS模式提供了更好的性能和更高的可扩展性，尤其是在大规模集群环境下。



ubuntu系统默认已经加载ipvs内核模块,但可能没有加载，查看验证：

```bash
lsmod | grep ip_vs
#如果为空，则未加载，加载：
sudo  modprobe  ip_vs
```

安装 ipvsadm ipset
[ipvsadm_1.31-1build2_amd64.deb](https://launchpadlibrarian.net/592752683/ipvsadm_1.31-1build2_amd64.deb)

`ipvsadm`是用于管理Linux内核中IPVS服务的工具。它允许管理员添加、修改、删除IPVS表中的规则，以及列出当前的配置。在Kubernetes环境中，当使用基于IPVS的kube-proxy时，kube-proxy会利用`ipvsadm`来配置和更新内核的IPVS规则，以实现服务的负载均衡。

主要功能包括：

- 查看当前IPVS负载均衡配置和统计信息。
- 添加或删除虚拟服务以及它们的真实服务器。
- 修改现有的虚拟服务配置。

查看当前负载均衡规则：

```bash
sudo ipvsadm -Ln
```



[ipset_7.15-1build1_amd64.deb](https://launchpadlibrarian.net/592752716/ipset_7.15-1build1_amd64.deb)
	- 依赖
	- [libipset13_7.15-1build1_amd64.deb](https://launchpadlibrarian.net/592752717/libipset13_7.15-1build1_amd64.deb)

`ipset`是Linux内核的一部分，用于创建和管理IP地址集合、网络地址或端口集合的工具。它与iptables（或者在IPVS的上下文中使用）紧密集成，允许基于这些集合快速高效地过滤和路由网络流量。

在Kubernetes中使用IPVS时，`ipset`用于管理和优化规则集，使得IPVS的规则匹配过程更加高效。例如，可以通过`ipset`创建一个包含所有需要负载均衡的目标IP地址的集合，然后在IPVS规则中引用这个集合，这样就可以在不增加单个规则数量的情况下，高效地处理大量目标地址。

主要功能包括：

- 创建和管理IP地址集合、网络地址集合或端口集合。
- 高效地处理大量地址或端口，提高过滤和匹配的性能。
- 与iptables或IPVS规则集成，实现复杂的选择逻辑。

`ipvsadm`和`ipset`在Kubernetes中使用IPVS时发挥着至关重要的作用。`ipvsadm`直接管理IPVS的负载均衡规则，而`ipset`则用于优化这些规则的匹配和处理过程，两者共同提高了Kubernetes集群的网络性能和效率。

### 设置服务启动参数
```bash
sudo vim /etc/sysctl.d/k8s.conf 

# 内容：
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
vm.swappiness=0
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_instances=8192
fs.inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net.ipv6.conf.all.disable_ipv6=1
net.netfilter.nf_conntrack_max=2310720

# 使配置生效
sudo sysctl -p /etc/sysctl.d/k8s.conf
```

### 整合kubectl与cri-dockerd
1. 修改配置文件
```bash
sudo vim /usr/lib/systemd/system/cri-docker.service

# 将ExecStart修改为：
ExecStart=/usr/bin/cri-dockerd --container-runtime-endpoint fd:// --network-plugin=cni --cni-bin-dir=/opt/cni/bin --cni-cache-dir=/var/lib/cni/cache --cni-conf-dir=/etc/cni/net.d --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9

```
>在/usr/lib/systemd/system/cri-docker.service文件中添加上如上配置；
>
>--network-plugin：指定网络插件规范的类型，这里要使用CNI；
>
>--cni-bin-dir：指定CNI插件二进制程序文件的搜索目录；
>
>--cni-cache-dir：CNI插件使用的缓存目录；
>
>--cni-conf-dir：CNI插件加载配置文件的目录；
>
>--pod-infra-container-image:指定pause镜像 这个一定要配置，不然systemctl status cri-docker会报错


2. 重启cri-dockerd
```bash
sudo  systemctl daemon-reload && sudo systemctl restart cri-docker

```
### 初始化节点
**master**
使用kubedam初始化master节点
```bash
sudo kubeadm init --kubernetes-version=v1.27.4 --apiserver-advertise-address=xxxxxx --apiserver-bind-port=6443 --image-repository=registry.aliyuncs.com/google_containers --service-cidr=10.96.0.0/12 --pod-network-cidr=10.244.0.0/16 --ignore-preflight-errors=Swap --cri-socket=unix:///run/cri-dockerd.sock --v=5

```
常规参数解析：
```bash
--apiserver-advertise-address：指定API服务器通告给集群成员的IP地址。这通常是控制平面节点的IP地址。
--apiserver-bind-port：API服务器监听的端口，默认为6443。
--cert-dir：存储集群证书的目录路径。
--config：指向kubeadm配置文件的路径。可以使用此文件来指定复杂的配置。
--control-plane-endpoint：为控制平面节点设置一个共享的端点，这对于设置高可用集群是必要的。它可以是一个IP地址或者一个DNS名。
--cri-socket：指定容器运行时接口（CRI）的套接字路径，用于与容器运行时通信。
--image-repository：指定用于拉取控制平面镜像的容器仓库。
--kubernetes-version：指定要安装的Kubernetes版本。
--node-name：指定当前节点的名称。
--pod-network-cidr：指定Pod网络的IP范围。这必须与网络插件的配置相匹配。
--service-cidr：指定用于服务的IP地址范围，默认是10.96.0.0/12。
--service-dns-domain：为服务创建的DNS域名，默认是cluster.local。

```
k8s的镜像默认是谷歌地址，需要挂代理，如果没有代理，可以手动指定镜像地址：`--image-repository="registry.aliyuncs.com/google_containers"`

```bash
# 查看镜像列表
$ zzx@ubuntu-node1:~/.kube$ kubeadm config images list
registry.k8s.io/kube-apiserver:v1.30.2
registry.k8s.io/kube-controller-manager:v1.30.2
registry.k8s.io/kube-scheduler:v1.30.2
registry.k8s.io/kube-proxy:v1.30.2
registry.k8s.io/coredns/coredns:v1.11.1
registry.k8s.io/pause:3.9
registry.k8s.io/etcd:3.5.12-0

# 提前拉取，如果不提前拉取，会在kubeadm init时自动拉取
kubeadm config images pull --cri-socket unix:///var/run/cri-dockerd.sock  --image-repository="registry.aliyuncs.com/google_containers"
```

初始化完成后会提示接下来需要做的步骤: 安装网络插件，配置kubectl，worker节点加入方式

```bash
 To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.109.128:6443 --token c495pe.f7viqe90sg2p8ve1 \
        --discovery-token-ca-cert-hash sha256:28510b71e26bb49ff611ba93211cb2bc7a68af5bc5c9e931570f64d2d80a431d        

```
**设置允许master调度pod**
查看当前节点的taints：
```bash
sudo kubectl describe node ubuntu-node1 | grep Taints

# kubectl如果配置了非root用户，则不需要使用sudo
# 会返回： node-role.kubernetes.io/control-plane:NoSchedule

# 执行
kubectl taint node master node-role.kubernetes.io/control-plane:NoSchedule-
# master节点即可运行pods

```



**worker节点**

worker节点加入集群

```bash
sudo kubeadm join 192.168.109.128:6443 --token 392fxk.6ky5juct3d55tye8 \
        --discovery-token-ca-cert-hash sha256:28510b71e26bb49ff611ba93211cb2bc7a68af5bc5c9e931570f64d2d80a431d  --cri-socket=unix:///run/cri-dockerd.sock --v=5

# 如果token失效，可以通过master节点kubeadm添加
sudo kubeadm token create

# 查看令牌
sudo kubeadm token list
```
*注:* `--discovery-token-ca-cert-hash`是用于 Kubernetes 节点加入集群时验证控制节点证书的哈希值。这个哈希值并不直接依赖于 token。
可以通过openssl获取：
```bash
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'
```


### 安装网络插件

Kubernetes网络插件负责在集群中实现网络功能，包括容器间通信、Pod与外部世界通信以及负载均衡等。这些插件遵循CNI（容器网络接口）规范，提供灵活的网络解决方案。

**calico**   [calico配置文件](https://raw.githubusercontent.com/projectcalico/calico/master/manifests/calico.yaml)

```bash
# kubectl apply -f [网络插件配置文件]
kubectl apply -f calico.yml
```



*注：* worker节点只需要加入到集群中，节点就会自动配置网络，不需要再安装网络插件了。



## 问题及解决
1. 使用`kubectl get nodes`，statusb不是ready状态
尝试重启containerd及kubelet
```bash
systemctl restart containerd

systemctl restart kubelet

```




## Reference

[基于docker和cri-dockerd部署k8sv1.26.3](https://www.cnblogs.com/qiuhom-1874/p/17279199.html)