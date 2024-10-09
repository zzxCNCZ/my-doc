## k8s配置参数

### api version

Kubernetes API版本列表，不同的api支持的资源不同。

```bash
# 通过命令查看
kubectl api-versions

$ zzx@ubuntu-node1:~$ kubectl api-versions
admissionregistration.k8s.io/v1
apiextensions.k8s.io/v1
apiregistration.k8s.io/v1
apps/v1
authentication.k8s.io/v1
authorization.k8s.io/v1
autoscaling/v1
autoscaling/v2
batch/v1
certificates.k8s.io/v1
coordination.k8s.io/v1
crd.projectcalico.org/v1
discovery.k8s.io/v1
events.k8s.io/v1
flowcontrol.apiserver.k8s.io/v1
flowcontrol.apiserver.k8s.io/v1beta3
networking.k8s.io/v1
node.k8s.io/v1
policy/v1
rbac.authorization.k8s.io/v1
scheduling.k8s.io/v1
storage.k8s.io/v1
v1

```

通过 `kubectl api-resources` 查看各个资源使用的 API 版本

**api 版本与资源对照**

| **apiVersion**                    | 资源类型                                                     | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `v1`                              | `Pod`、`Service`、`Endpoints`、`ReplicationController`、`Namespace`、`Secret`、`ConfigMap`、`PersistentVolume`、`PersistentVolumeClaim`、`Event` | `v1` API 版本是 Kubernetes 核心 API 版本，其中包括了大多数核心资源类型 |
| `apps/v1`                         | `Deployment`、`ReplicaSet`、`StatefulSet`、`DaemonSet`、`ControllerRevision` | `apps/v1` API 版本用于管理应用程序的部署和状态               |
| `batch/v1`                        | `Job`                                                        | `batch/v1` API 版本用于管理一次性任务或按计划运行的任务      |
| `batch/v2alpha1`                  | `CronJob`                                                    | `batch/v2alpha1` API 版本用于管理按计划运行的任务            |
| `networking.k8s.io/v1`            | `Ingress`、`NetworkPolicy`                                   | `networking.k8s.io/v1` API 版本用于管理网络相关的资源        |
| `autoscaling/v1`                  | `HorizontalPodAutoscaler`                                    | `autoscaling/v1` API 版本用于自动缩放 Pod 的数量             |
| `rbac.authorization.k8s.io/v1`    | `Role`、`ClusterRole`、`RoleBinding`、`ClusterRoleBinding`   | `rbac.authorization.k8s.io/v1` API 版本用于管理访问控制      |
| `storage.k8s.io/v1`               | `StorageClass`                                               | `storage.k8s.io/v1` API 版本用于定义存储类                   |
| `admissionregistration.k8s.io/v1` | `MutatingWebhookConfiguration`、`ValidatingWebhookConfiguration`、`ServiceReference` | `admissionregistration.k8s.io/v1` API 版本用于定义和配置 Webhook |
| `apiextensions.k8s.io/v1beta1`    | `CustomResourceDefinition`                                   | `apiextensions.k8s.io/v1beta1` API 版本用于定义自定义资源    |
| `scheduling.k8s.io/v1`            | `PriorityClass`                                              | `scheduling.k8s.io/v1` API 版本用于定义调度相关的资源        |
| `cert-manager.io/v1alpha2`        | `Certificate`、 `Issuer`、 `ClusterIssuer`、 `Challenge`, `Order`、 `CertificateRequest` | `cert-manager.io/v1alpha2` API 版本用于管理证书              |



### API
**Deployments**

**Service**

****



### 配置docker registry 密钥

使用kubectl创建：
```bash
kubectl create secret docker-registry myregistrykey --docker-server=registry.cn-shanghai.aliyuncs.com --docker-username=username --docker-password=passwd
```
使用当前docker配置文件方式:
```bash
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
```

查看密钥，并以yaml显示
```bash
kubectl get secret myregistrykey --output=yaml   

```

### kubernetes组件
1. helm


### 常用指令
1. pods
```bash
# 查看pods  如果不加 -n 默认查看 default命名空间的pods
kubectl get pods

kubectl get pods -n dev



# 查看pod 详细信息
kubectl describe pod kubernetes-dashboard-web -n kubernetes-dashboard


# 删除pod（不会完全删除，会重启）
kubectl delete po msa-user-0 -n dev
kubectl delete pod -n kube-system -l k8s-app=calico-kube-controllers
# 完全删除需要，delete 对应资源类型  + 名称
kubectl delete StatefulSet mas-user -n dev

#  -o wide 宽幅输出，会显示更多信息，pod ip地址，所在节点等
kubectl get pod -n ingress-nginx -o wide

# exec
kubectl exec msa-user-0 -n dev env

kubectl exec -ti msa-user-0 -n dev -- /bin/bash

#  查看calico的pod
kubectl get pods -n kube-system | grep calico


# 查看日志
kubectl logs  msa-user-0 -n dev

# 查看ingress类型的资源
kubectl get ing -n dev

kubectl describe ing msa-http -n dev
```

2. nodes 
```bash

```

3. namespace
```bash
# 查看dev  namespace的所有 
kubectl get all -n dev


```

4. helm
```bash
# 创建一个名为 "msa" 的 Helm Chart，并将其命名空间设置为 "dev"
helm create msa -n dev

# 调试 debug
helm install msa mdm --dry-run --debug -n dev



# 将 msa 的 Helm Chart 安装到 dev中
helm install msa cloud -n dev


# 查看 chart 历史
helm history msa -n dev


# 升级debug
helm upgrade msa mdm -n dev --debug
# 升级
helm upgrade msa mdm -n dev

# 卸载
helm uninstall msa -n dev



# 添加仓库
helm repo add stable https://helm.940303.xyz/stable

# 搜索repo
helm search repo stable
helm search repo stable/redis

# 查看仓库
helm repo list
```

[chart search](https://artifacthub.io/packages/search?kind=0&sort=relevance&page=1)

5.	





## Kubernetes组件
### Ingress Controller
**Ingreee Controller作用**

**路由管理：** Ingress Controller负责实现Ingress规则定义的路由逻辑，将外部请求转发到正确的服务。
**性能优化：**某些Ingress Controller提供高级路由、负载均衡功能以及SSL/TLS终端解密，可以提高应用程序的性能和安全性。
**集中管理：**通过Ingress Controller，可以集中管理入口流量规则，而不是在每个服务级别手动配置路由规则，简化了网络配置和管理。

安装[nginx ingerss controller]( https://github.com/kubernetes/ingress-nginx)

```bash
# nginx ingerss controller  https://github.com/kubernetes/ingress-nginx
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml

# 安装
kubectl apply -f deploy.yaml


# 查看service
kubectl get svc -n ingress-nginx


# 转发端口 访问ingress nginx  开发环境没有external ip时使用
kubectl port-forward --address 0.0.0.0 svc/ingress-nginx-controller 8080:80 -n ingress-nginx


```


## Reference

[kubectl](https://kubernetes.io/zh-cn/docs/reference/kubectl/)

[kubernetes对象](https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/)

[kubernetes API](https://kubernetes.io/zh-cn/docs/reference/kubernetes-api/)

[ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

[helm usage](https://helm.sh/zh/docs/intro/quickstart/)

[docker>kubectl 指令](https://jimmysong.io/book/kubernetes-handbook/cli/docker-cli-to-kubectl/#docker-logs)

[Spring Cloud微服务部署实践](https://iothub.org.cn/docs/kubernetes/pro/microservice/cloud-deploy/#3%E6%B5%8B%E8%AF%95)