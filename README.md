# candy
candys  move  dispear
我是益达，这个是我写的一个小游戏
如有问题 请与我联系  邮箱 jsroads@163.com  



项目 开源地址 https://github.com/jsroads/candy
代码和素材都已经打包上传，地址里可以下到
我用是 cocos2d 3.12 最近的几个版本应该都可以
自己新建项目，替换原来默认的helloworld项目对应的文件即可。


关于素材合图，群里有个 plistcut.rar 这个可以下载，可以拆解我的素材！


对了游戏试玩地址：www.smile361.com

作者保留代码商用的权利，如有商业用途，请与作者联系，jsroads@163.com。


#plistcut.rar 
地址 https://github.com/jsroads/plistcut

#玩法介绍：

整体玩法介绍：玩家和Boss对战的玩法，每个关卡每次Boss打出固定的伤害，玩家打出的伤害是根据转出的效果计算的（少于三个糖果可以消除的时候，不计分）

1.用手点起一个小球，然后开始和相邻的彼此交换位置，转出可以消除的界面（比如横着三个，竖着三个的，也包含T形，土行 田行等，每种糖果打出伤害不同，三个心的形状的是给自己补充血的）

2.自己手动落下小球，或者在规定时间内（此游戏设定是10秒）此时开始计算伤害，然后本次消除结束后，上面的小球补充进来，此时如果有消除，将继续消除，直到一方死亡，或者界面没有消除为止

3.如果有一方死亡，则弹出胜利或者失败界面，开始下一轮，或者继续战斗的界面。没有死亡的情况，将继续下一次的操作。

4.路径只要大于1，就开始计算伤害，有同学问我，我和周围的糖果换了之后，换回来了，为啥对方打我了，这个是计算的规则，当然你可以修改源码，验证一下，想怎么设计，自己动手吧！


![image](https://github.com/jsroads/candy/blob/master/instruction/plant.gif)

![image](https://github.com/jsroads/candy/blob/master/instruction/plant1.gif)

![image](https://github.com/jsroads/candy/blob/master/instruction/teacher01.png)

![image](https://github.com/jsroads/candy/blob/master/instruction/teacher02.png)

![image](https://github.com/jsroads/candy/blob/master/instruction/teacher03.png)



