/**
 * Created by jsroads on 2016/8/13.16:40
 * Note:
 */
"use strict";
var AboutMeScene = GameBaseScene.extend({
    onEnter:function(){
        this._super(true);//初始化继承类的方法
        var layer = new AboutMeLayer();
        this.addChild(layer);
    }
});
var AboutMeLayer = cc.Layer.extend({
    ctor:function(){
        this._super();//初始化继承类的方法
        this.initBackgroud();
    },
    /**
     * 初始化背景图片
     */
    initBackgroud:function(){
        this.gameBg = new cc.Sprite("#about_me.jpg");//因为素材已经加载所以 前面有#
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


        //文本
        this.label = new cc.LabelTTF("2016-9-21 16:20 版本",'Arial', 25, cc.size(320,32),cc.TEXT_ALIGNMENT_CENTER);
        this.label.x = GC.w-180;
        this.label.y = GC.h-35;
        this.label.setFontFillColor(cc.color(255,255,255,255));
        this.label.enableStroke(cc.color(0,0,0,255),2);
        this.addChild(this.label);
    }
});