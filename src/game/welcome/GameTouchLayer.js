/**
 * Created by jsroads on 2016/8/9.15:00
 * Note: 主界面 交互元素层
 */
"use strict";
var GameTouchLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.initTouchLayer();
    },
    /**
     * 初始化 交换元素
     */
    initTouchLayer:function(){
        //因为素材已经加载所以 前面有#  初始化 开始菜单
        var startBtnNormal = new cc.Sprite("#begin_btn.png");
        var startBtnSelected = new cc.Sprite("#begin_btn_s.png");
        var startBtnDisable = new cc.Sprite("#begin_btn_d.png");

        var startSprite = new cc.MenuItemSprite(startBtnNormal,startBtnSelected,startBtnDisable,function (){
            AudioContror.onButtonEffect(res.mm_btneffect);
            this.startGame();
        }.bind(this));

        var aboutmeNormal = new cc.Sprite("#aboutme.png");
        var aboutmeSelected = new cc.Sprite("#aboutme_s.png");
        var aboutmeDisable = new cc.Sprite("#aboutme_d.png");

        var aboutmeSprite = new cc.MenuItemSprite(aboutmeNormal,aboutmeSelected,aboutmeDisable,function (){
            AudioContror.onButtonEffect(res.mm_btneffect);
            this.aboutMeGame();
        }.bind(this));

        var menu = new cc.Menu(startSprite,aboutmeSprite);
        menu.alignItemsVerticallyWithPadding(10);
        menu.x = GC.w_2;
        menu.y = 200;
        this.addChild(menu);
    },
    /**
     * 开始游戏回调
     */
    startGame:function(){

        // return;
        cc.director.runScene(new cc.TransitionFade(GC.TRANSITI_TIME,new GamePlayScene()));//进入操作场景
    },
    /**
     * 关于作者回调
     */
    aboutMeGame:function(){
        cc.audioEngine.stopMusic();
        cc.director.runScene(new cc.TransitionFade(GC.TRANSITI_TIME,new AboutMeScene()));//自我介绍
    }
});