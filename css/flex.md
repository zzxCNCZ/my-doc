# flex
::: tip 容器属性
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content
:::


## flex-direction
> flex-direction属性, 决定主轴的方向（即项目的排列方向）。
```css
 /* 默认 row */
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
![image.png](https://chevereto.zhuangzexin.top/images/2020/10/13/image.png)
- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。


## flex-wrap
> flex-wrap属性,默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
```css
/* nowrap（默认）：不换行。*/
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
![image41224a004ffd8bf6.png](https://chevereto.zhuangzexin.top/images/2020/10/13/image41224a004ffd8bf6.png)
- nowrap（默认）：不换行。
![imagedee81b6eff0972b9.png](https://chevereto.zhuangzexin.top/images/2020/10/13/imagedee81b6eff0972b9.png)
- wrap：换行，第一行在上方。
![image6cb2be4855f613d2.png](https://chevereto.zhuangzexin.top/images/2020/10/13/image6cb2be4855f613d2.png)
- wrap-reverse：换行，第一行在下方。
![image1e7f597a5cb448a3.png](https://chevereto.zhuangzexin.top/images/2020/10/13/image1e7f597a5cb448a3.png)

## flex-flow
> flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```             
## justify-content
> justify-content属性, 属性定义了项目在主轴上的对齐方式。
```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
![imagefe6a00ce303e6a08.png](https://chevereto.zhuangzexin.top/images/2020/10/13/imagefe6a00ce303e6a08.png)
- flex-start（默认值）：左对齐
-flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

##  align-items
> align-items属性, 定义项目在交叉轴上如何对齐。
```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
![imagea2bf5ce3f458960f.png](https://chevereto.zhuangzexin.top/images/2020/10/13/imagea2bf5ce3f458960f.png)
- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

## align-content
> align-content属性, 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
 ```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
``` 
![imagef961ec2d141096c1.png](https://chevereto.zhuangzexin.top/images/2020/10/13/imagef961ec2d141096c1.png)                   
- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

::: tip 项目属性
- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self
:::
## order
> order属性, 定义项目的排列顺序。数值越小，排列越靠前，默认为0。
```css
.item {
  order: <integer>;
}
```
![image875969926b2d4294.png](https://chevereto.zhuangzexin.top/images/2020/10/13/image875969926b2d4294.png)
## flex-grow
> flex-grow属性, 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
```css
.item {
  flex-grow: <number>; /* default 0 */
}
```
![imagefb36f88042161ad3.png](https://chevereto.zhuangzexin.top/images/2020/10/13/imagefb36f88042161ad3.png)
> 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## flex-shrink
> flex-shrink属性, 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```
![image171f6c48524ea6cf.png](https://chevereto.zhuangzexin.top/images/2020/10/13/image171f6c48524ea6cf.png)
> 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
  负值对该属性无效。

## flex-basis
> flex-basis属性, 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
> 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

## flex
> flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
> 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
  建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

## align-self
> align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
![image2a1b71d03f6dec25.png](https://chevereto.zhuangzexin.top/images/2020/10/13/image2a1b71d03f6dec25.png)
> 该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
