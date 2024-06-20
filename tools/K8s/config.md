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

