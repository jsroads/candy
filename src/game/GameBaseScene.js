/**
 * Created by jsroads on on 2016/8/28.14:24
 * e-mail:jsroads@163.com
 * Note: 游戏场景里面的基本类，所有的场景都要继承这个类
 */
"use strict";
var GameBaseScene = cc.Scene.extend({
    onEnter:function (bool) {
        this._super();
        GC.GAME_STATE = GC.GAME_STATE_ENUM.HOME;
        AudioContror.playMusic();

        this.gameTouchListener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: function(keyCode, event) {
                    if (keyCode == cc.KEY.back) {    //beta版本这里的back的keycode有误，也可以自行改为6
                        cc.log("return button clicked. keycode:" + keyCode);
                        cc.director.end();
                    }
                    else if (keyCode == cc.KEY.menu) {    //beta版本这里的menu的keycode有误，也可以自行改为15
                        cc.log("menu button clicked. keycode:" + keyCode);

                    }
                }
            }

        );
        cc.eventManager.addListener(this.gameTouchListener, this);


        //进入后台
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(){
            //
            cc.director.pause();
        });


        //恢复显示
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function(){
            //
            cc.director.resume();
        });


        this.systemLayer = new cc.Layer();
        this.systemLayer.attr({
            anchorX:0,
            anchorY:0
        });
        this.addChild(this.systemLayer,160);

        var musicBtn = new MusicSprite();
        // musicBtn.setPosition(-GC.w_2+70,GC.h_2-140);
        this.systemLayer.addChild(musicBtn);

        var soundBtn = new SoundSprite();
        // soundBtn.setPosition(-GC.w_2+70,GC.h_2-220);
        this.systemLayer.addChild(soundBtn);
        // 需要不需要初始化返回按钮
        if(bool){
            this.initBackBtn();
            musicBtn.setPosition(-GC.w_2+70,GC.h_2-140);
            soundBtn.setPosition(-GC.w_2+70,GC.h_2-220);
        }else {
            musicBtn.setPosition(-GC.w_2+70,GC.h_2-70);
            soundBtn.setPosition(-GC.w_2+70,GC.h_2-140);
        }
    },
    /**
     * 初始化 返回主界面场景
     */
    initBackBtn:function () {
        var backN = new cc.Sprite("#back.png");
        var backS = new cc.Sprite("#back_s.png");
        var backD = new cc.Sprite("#back.png");

        var backSprite = new cc.MenuItemSprite(backN,backS,backD,function (){
            AudioContror.onButtonEffect(res.mm_btneffect);
            this.backMainGame();
        }.bind(this));

        var menu = new cc.Menu(backSprite);
        menu.alignItemsVerticallyWithPadding(10);
        menu.x = 70;
        menu.y = GC.h-60;
        this.systemLayer.addChild(menu);
    },
    /**
     * 返回主界面回调方法
     */
    backMainGame:function(){
        cc.director.runScene(new cc.TransitionFade(GC.TRANSITI_TIME,new WelcomeScene()));//进入操作场景
    },
    onExit:function () {
        this.systemLayer.removeFromParent(true);
        cc.eventManager.removeListener(this.gameTouchListener);
        this._super();
    }
});