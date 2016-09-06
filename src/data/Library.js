/**
 * Created by jsroads on 2016/8/9.16:55
 * Note: 关卡数据
 */
"use strict";
//游戏数据
var Library = Library||{};

Library.LINE_SIZE = 10;//行数  实际 是10行 玩家操作下面 5行

Library.ROW_SIZE = 6;//游戏的列数
Library.MAP_X = 70;//布局位置 容错 X
Library.MAP_Y = 70;//布局位置 容错 Y
Library.GRID_SIZE = 100;// 格子的宽度|高度

Library.PLAY_TIME = 10;// 操作时间

Library.map = [];//显示对象的显示地图{二维数组}

Library.locked = false;//小球能否点击//在动画没有播放完毕时候玩家不能进行下一次的操作

Library.strg = true;//小球移动动画是否结束的标示

Library.curCandy = null;//当前被操作的对象

Library.moveCandy = null;//漂浮起来的对象

Library.tempInfo = {};//临时信息存储

Library.curPoint= cc.p(0,0);//当前位置坐标

Library.hitPoint= cc.p(0,0);//目标交换位置坐标

Library.pathList = []; //小球经过的路径 前端和服务器验证路径是否可行（防止外挂）

Library.dispearList = [];//消失的小球的数组 二维数组 其中 每个子对象为一个连击

Library.all_map = [];//散乱的消失的显示对象的数组

Library.time = 0;//时间计时器



Library.CANDY_COLOR_LIST=["0","1","2","3","4","5"];//不同的颜色的对象数组 常量数组

