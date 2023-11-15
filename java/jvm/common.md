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

### jmap 分析
jmap命令可以获得运行中的jvm的堆的快照，从而可以离线分析堆，以检查内存泄漏，检查一些严重影响性能的大对象的创建，检查系统中什么对象最多，各种对象所占内存的大小等等
```bash
# 根据pid  查看最多的五个实例
jmap -histo:live <pid> | awk '{print $2 " " $1}' | sort -nr | head -n 5
# 查看全部实例占用
jmap -histo:live <pid>
```

### jstat 分析gc 
可以查看老年区和新生区的使用情况，以及gc的次数和时间
```bash
# 查看各个区的使用情况
jstat -gccapacity <pid> 1000 10

# 查看gc的次数和时间
jstat -gcutil <pid> 1000 10

```
*附：*
```
NGCMN：年轻代（New Generation）最小容量，单位为KB。
NGCMX：年轻代最大容量，单位为KB。
NGC：当前年轻代容量，单位为KB。
S0C：Survivor 0区的当前容量，单位为KB。
S1C：Survivor 1区的当前容量，单位为KB。
EC：Eden区（Young Generation中的伊甸园区）的当前容量，单位为KB。
OGCMN：老年代（Old Generation）最小容量，单位为KB。
OGCMX：老年代最大容量，单位为KB。
OGC：当前老年代容量，单位为KB。
OC：当前压缩类空间（Compressed Class Space）容量，单位为KB。
MCMN：最小元空间（Metaspace）容量，单位为KB。
MCMX：最大元空间容量，单位为KB。
MC：当前元空间容量，单位为KB。
CCSMN：压缩类空间最小容量，单位为KB。
CCSMX：压缩类空间最大容量，单位为KB。
CCSC：压缩类空间的当前容量，单位为KB。
YGC：年轻代垃圾收集的次数。
FGC：老年代垃圾收集的次数。
CGC：压缩类空间垃圾收集的次数。

```

### jcmd 查看jvm heap信息
```bash
# 查看jvm heap信息
jcmd <pid> GC.heap_info
```
该命令可以获取JVM堆内存的详细信息，它用于查看与Java堆内存相关的统计数据，包括堆的总大小、已使用的堆内存大小以及分代堆的详细信息。

已使用的堆内存大小，即为JVM当前已使用的堆内存大小，它等于新生代已使用的堆内存大小加上老年代已使用的堆内存大小。也是当前java进程的堆内存大小。


### JVM（Java虚拟机）包括以下几部分内存：
1. 堆（Heap）：堆是JVM中最大的一块内存区域，用于存储对象实例和数组。堆被所有线程共享，并在运行时动态分配。它可以分为新生代（Young Generation）和老年代（Old Generation）两部分。

   - 新生代：新创建的对象会被分配到新生代。新生代又被划分为一个Eden空间和两个Survivor空间（通常称为From和To空间）。大多数对象在新生代很快被回收。

   - 老年代：经过多次垃圾回收仍然存活的对象会被移到老年代。老年代的对象生命周期较长，且在进行垃圾回收时耗费较大。

2. 方法区（Method Area）：方法区用于存储类和方法的元数据信息，包括类的结构信息、运行时常量池、字段和方法数据、方法代码等。方法区是各个线程共享的。

3. 程序计数器（Program Counter）：程序计数器是一块较小的内存区域，它指向当前线程正在执行的字节码指令的地址或下一条将要执行的指令地址。在多线程环境下，每个线程都有自己的程序计数器。

4. 虚拟机栈（VM Stack）：虚拟机栈用于存储方法的局部变量、方法参数、返回值和操作数栈等信息。每个线程在运行时都会创建一个虚拟机栈，栈中的每个元素称为栈帧，对应一个方法调用。

另外，除了上述内存区域之外，JVM还有一些其他的辅助内存空间，如直接内存（Direct Memory），它是JVM使用的一种特殊内存区域，直接与操作系统交互。

### New Generation是什么？
New Generation（新生代）是Java虚拟机堆内存中的一部分，用于存储新创建的对象。新生代主要由两个区域组成：Eden空间和Survivor空间。

- Eden空间：当Java程序创建一个新对象时，该对象会被分配在Eden空间。通常情况下，大部分对象在很短时间内就会变得不可达，因此Eden空间具有较高的对象回收率。

- Survivor空间：当Eden空间满了之后，仍然存活的对象将被移动到Survivor空间。Survivor空间被划分为两个相等大小的区域，通常被称为From空间和To空间。在进行垃圾回收时，存活的对象会从Eden空间和上一次回收时的Survivor空间复制到另一个空闲的Survivor空间。

通过这种复制方式，JVM可以实现快速、高效的垃圾回收。在一次完整的垃圾回收过程中，存活的对象会被复制到另一个Survivor空间，而不再使用的对象则会被释放。

在新生代中，对象经过多次进行垃圾回收仍然存活的，会被晋升到老年代（Old Generation）。这是因为老年代中的对象具有较长的生命周期，需要更大的内存空间来存储。新生代和老年代之间的对象晋升过程通常由JVM根据一些规则和策略决定。

### 如何判断是否内存泄漏？
当运行一个java进程时，内存占用不断增加，但是没有明显的内存泄漏异常，这时候可以使用jmap命令查看堆内存的快照，然后使用jhat命令分析堆内存的快照，查看哪些对象占用了大量的内存，从而判断是否存在内存泄漏。