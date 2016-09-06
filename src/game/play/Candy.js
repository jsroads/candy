/**
 * Created by jsroads on 2016/8/9.18:28
 * e-mail:jsroads@163.com
 * Note: 操作的玩偶类
 */
"use strict";
var Candy = cc.Sprite.extend({
    candyColor:"",//颜色，用于操作 和对比 查找等
    candyName:"",//名字 暂时未使用，在调试期间 用于识别
    line:0,//行 从下到上 最下面是 0
    row:0,//列 从左到右  最左边是 0
    diff:0,//中间作为一个计数器 容错运动的时候用到
    rect:{x:0,y:0,width:0,height:0},//当前对象的矩形范围用于判断交换位置
    ctor: function (candyColor, line, row) {
        this._super("#candy_" + candyColor + ".png");
        this.init(candyColor, line, row);
    },

    init: function (candyColor, line, row) {
        this.candyColor = candyColor;
        this.line = line;
        this.row = row;
        this.candyName="candy"+line+"_"+row;
        this.rect= {x:row*Library.GRID_SIZE-Library.GRID_SIZE/2+Library.MAP_X,
            y:line*Library.GRID_SIZE-Library.GRID_SIZE/2+Library.MAP_Y,
            width:Library.GRID_SIZE,height:Library.GRID_SIZE};
        //cc.log("cc jsroads:------------this.candyName: "+JSON.stringify(this.candyName));
        //cc.log("cc jsroads:------------this.rect: "+JSON.stringify(this.rect));
    }

});