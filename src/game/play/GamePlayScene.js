/**
 * Created by jsroads on 2016/8/9.15:45
 * Note: 玩家操作场景
 */
"use strict";
var GamePlayScene = GameBaseScene.extend({
    layer:null,
    onEnter:function(){
        this._super(true);
        cc.spriteFrameCache.addSpriteFrames(res.boss_s_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fight_s_plist);
        this.initGame();
    },
    initGame:function () {
        this.layer = new GamePlayLayer();
        this.addChild(this.layer);
    },
    reseGame:function (isWin) {
        if(!this.layer){
            this.initGame();
        }else {
            this.layer.resetGame(isWin);
        }
    }
});
var GamePlayLayer = cc.Layer.extend({
    container:null,
    gridBgLayer:null,
    candyLayer:null,
    shape:null,
    shape_:null,
    ctor:function(){
        this._super();
        this.initBackgroud();
        this.container = new cc.Node();
        this.addChild(this.container);

        this.gridBgLayer = new GridBgLayer();
        this.container.addChild(this.gridBgLayer);

        this.initGameLayout();
        AudioContror.playMusic();
    },
    initBackgroud:function(){
        this.gameBg = new cc.Sprite("#game_pan.jpg");

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
    },
    initGameLayout:function(){
        this.candyLayer = new CandyLayer();
        this.candyLayer.tag = GC.PLAY_LAYER_TAG;
        this.container.addChild(this.candyLayer);
    },
    resetGame:function (isWin) {
        this.candyLayer.resetGame(isWin);
    }

});