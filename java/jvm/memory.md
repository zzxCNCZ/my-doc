# jvm内存分析
> 导出runtime 的jvm堆内存文件，并分析

#### 具体步骤
1. 导出jvm堆内存文件
使用jmap命令导出jvm堆内存文件
```bash 
jmap -dump:format=b,file=dumpfile.hprof <pid>
```
2. 使用MAT工具分析jvm堆内存文件
[MAT 内存分析工具](https://eclipse.dev/mat/)
导入 dumpfile.hprof 文件
![qoX5wf](https://chevereto.zhuangzexin.top/images/2023/12/08/qoX5wf.png)


| 视图/报告         | 含义                                                         |
| ----------------- | ------------------------------------------------------------ |
| Histogram         | 列举类创建的对象的个数以及所占的大小                         |
| Dominator Tree    | 展示堆内存中Retained Heap占用最大的对象，以及依赖这些对象存活的对象的树状结构 |
| Top Consumers     | 按照类或包的纬度展示出最占内存的对象                         |
| Duplicate Classes | 显示重复加载的类信息                                         |
| Leak Suspects MA  | 提示的可能存在的内存泄露                                     |


3. 分析内存泄漏
主要使用Leak Suspects MA视图，该视图会提示可能存在的内存泄漏，如下图所示：
![S6E5tu](https://chevereto.zhuangzexin.top/images/2023/12/08/S6E5tu.png)
可以看到，该视图提示了可能存在的内存泄漏，其中包括了内存泄漏的类、实例数量、内存占用大小、内存泄漏的原因等信息。

4. 分析内存泄漏的原因
在Leak Suspects MA视图中可以看到大概得知内存泄漏的原因，但是具体的原因还需要进一步分析。可以使用Dominator Tree视图来分析内存泄漏的原因，该视图会展示堆内存中Retained Heap占用最大的对象，以及依赖这些对象存活的对象的树状结构，如下图所示：
![yFFuTw](https://chevereto.zhuangzexin.top/images/2023/12/08/yFFuTw.png)

如上图，第一个对象占用的内存最大，它依赖的对象也占用了大量的内存，因此可以判断出内存泄漏的原因是该对象没有被释放，导致依赖它的对象也没有被释放，从而导致内存泄漏。
![qXYPXA](https://chevereto.zhuangzexin.top/images/2023/12/08/qXYPXA.png)

同时右击该对象，可以查看该对象的详细信息，包括该对象的引用关系、实例数量、内存占用大小等信息，如下图所示：
![TUHgRc](https://chevereto.zhuangzexin.top/images/2023/12/08/TUHgRc.png)
with outgoing references: 查看它所引用的对象
with incoming references: 查看它被哪些对象引用

![sZNVES](https://chevereto.zhuangzexin.top/images/2023/12/08/sZNVES.png)

可以查看到该对象被哪些对象引用，以及它所引用的对象，从而进一步分析内存泄漏的原因，如下图所示：
![e4bac52f650469bacf4b227858c46547](https://chevereto.zhuangzexin.top/images/2023/12/08/e4bac52f650469bacf4b227858c46547.png)