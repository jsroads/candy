/**
 * Created by jsroads on 2016/8/9.14:18
 * Note:  主界面 背景图片
 */
"use strict";
var BackgroudLayer = cc.Layer.extend({
    ctor:function(){
        this._super();//初始化继承类的方法
        this.initBackgroud();
    },
    /**
     * 初始化背景图片
     */
    initBackgroud:function() {
        this.gameBg = new cc.Sprite("#game_bg.jpg");//因为素材已经加载所以 前面有#
        var rect =  this.gameBg.getTextureRect();
        this.gameBg.attr({
            anchorX:0,
            anchorY:0,
            x:0,
            y:0,
            width:GC.w,
            height:GC.h,
            scaleX:GC.w/rect.width,
            scaleY:GC.h/rect.height
        });
        this.addChild(this.gameBg);
    }
});