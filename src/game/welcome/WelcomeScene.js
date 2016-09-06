/**
 * Created by jsroads on 2016/8/9.12:11
 * Note:游戏的欢迎界面，就是开始游戏前 用户选择的界面
 */
"use strict";
/**
 * 创建游戏的欢迎界面
 */
var WelcomeScene = GameBaseScene.extend({
    onEnter:function(){
        this._super();//初始化继承类的方法
        //创建一个层 用来显示真正的欢迎面板
        var layer = new WelcomeLayer();
        this.addChild(layer);
    }
});
/**
 * 欢迎面板层
 */
var WelcomeLayer = cc.Layer.extend({
    ctor:function(){
        this._super();//继续运行父类方法
        cc.spriteFrameCache.addSpriteFrames(res.game_s_bg_plist);
        this.setBackGroundLayer();
        this.setTouchLayer();
    },
    /**
     * 初始化 背景层
     */
    setBackGroundLayer:function(){
        var background = new BackgroudLayer();
        this.addChild(background);

    },
    /**
     * 初始化 交互层
     */
    setTouchLayer:function(){
        var toucher = new GameTouchLayer()
        this.addChild(toucher);
    }
});