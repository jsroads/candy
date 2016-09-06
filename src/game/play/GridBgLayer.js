/**
 * Created by jsroads on 2016/8/9.17:16
 * Note:
 */
"use strict";
var GridBgLayer = cc.Layer.extend({
    grid:null,
    ctor:function(){
        this._super();
        this.initGrids();
    },
    initGrids:function(){
        for(var line = 0;line<Library.LINE_SIZE;line++) {
            Library.map[line] = [];//创建二维数组只有这样得到了
            if(line<Library.LINE_SIZE/2)
            for (var row = 0; row < Library.ROW_SIZE; row++) {
                var frame;
                if(line ==0&&row==0){
                    frame = "c";
                }else if(line ==(Library.LINE_SIZE/2-1)&&row==0){
                    frame = "a";
                }else if(line ==0&&row==(Library.ROW_SIZE-1)){
                    frame = "d";
                }else if(line ==(Library.LINE_SIZE/2-1)&&row==(Library.ROW_SIZE-1)){
                    frame = "b";
                } else {
                    frame = "e";
                }
                this.grid = new GridBg(frame,line,row);
                this.grid.x=Library.MAP_X+row*Library.GRID_SIZE;
                this.grid.y=Library.MAP_Y+line*Library.GRID_SIZE;
                this.addChild(this.grid);
            }
        }

    }
});