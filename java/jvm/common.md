# JVM参数

### 常用jvm参数解析
```bash
-XX:CICompilerCount=3：设置JIT编译器线程数为3。
-XX:ConcGCThreads=1：设置并发垃圾收集器使用的线程数为1。
-XX:G1ConcRefinementThreads=4：设置G1垃圾收集器的并发细化阶段线程数为4。
-XX:G1EagerReclaimRemSetThreshold=32：设置当G1垃圾收集器的记忆集大小达到32MB时开始触发“急切回收”操作。
-XX:G1HeapRegionSize=4194304：设置G1堆区域的大小为4MB。
-XX:GCDrainStackTargetSize=64：设置垃圾收集器在清理期间减少栈容量的目标大小为64KB。
-XX:InitialHeapSize=528482304：设置JVM初始堆内存大小为528482304字节，约为504MB。
-XX:MarkStackSize=4194304：设置G1垃圾收集器标记阶段的堆栈大小为4MB。
-XX:MaxHeapSize=8392802304：设置JVM最大堆内存大小为8392802304字节，约为7.8GB。
-XX:MaxNewSize=5033164800：设置新生代最大内存大小为5033164800字节，约为4.7GB。
-XX:MinHeapDeltaBytes=4194304：设置JVM在自动调整堆大小时增加或减少的最小内存大小为4MB。
-XX:MinHeapSize=8388608：设置JVM最小堆内存大小为8388608字节，约为8MB。
-XX:NonNMethodCodeHeapSize=5832780：设置非本地方法代码缓存区的大小为5.56MB。
-XX:NonProfiledCodeHeapSize=122912730：设置未经过性能分析的代码缓存区的大小为117.2MB。
-XX:ProfiledCodeHeapSize=122912730：设置通过性能分析的代码缓存区的大小为117.2MB。
-XX:ReservedCodeCacheSize=251658240：设置代码缓存区的大小为240MB。
-XX:+SegmentedCodeCache：启用代码缓存区的分段模式。
-XX:SoftMaxHeapSize=8392802304：设置JVM软上限堆内存大小为8392802304字节，约为7.8GB。
-XX:+UseCompressedClassPointers：启用压缩类指针以节省内存。
-XX:+UseCompressedOops：启用压缩普通对象指针（OOPs）以节省内存。
-XX:+UseG1GC：启用G1垃圾收集器，它是JVM默认的垃圾收集器。
```
一般我们主要设置 MaxHeapSize 和 MinHeapSize，其他的参数可以根据实际情况进行调整。
如果没有设置JVM参数，JVM会根据物理内存的大小自动设置堆内存的大小，但是这样设置的堆内存大小可能不是最优的，因此我们需要根据实际情况进行调整。

### 查看JVM参数
```bash
# 查看java进程
jps

# 查看JVM参数
jinfo -flags pid
```

### 设置JVM参数
```bash
# 设置JVM参数
java --Xms256m -Xmx4096m  -XX:MaxNewSize=256m

```
