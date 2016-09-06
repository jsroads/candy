/**
 * Created by jsroads on 2016/8/9.17:00
 * Note: 北京格子背景图片
 */
"use strict";
var GridBg = cc.Sprite.extend({
    type: 0,
    line: 0,
    row: 0,
    ctor: function (type, line, row) {
        this._super("#grid_" + type + ".png");
        this.init(type, line, row);

        //显示坐标，便于观察，仅此而已 发布的时候 可以注释掉
        //var helloLabel = new cc.LabelTTF("("+(row*Library.GRID_SIZE-Library.GRID_SIZE/2+Library.MAP_X)+","+(line*Library.GRID_SIZE-Library.GRID_SIZE/2+Library.MAP_Y)+")", "Arial", 18);
        //helloLabel.x = 25;
        //helloLabel.y = 0;
        //this.addChild(helloLabel);
    },
    init: function (type, line, row) {
        this.type = type;
        this.line = line;
        this.row = row;
    }
});