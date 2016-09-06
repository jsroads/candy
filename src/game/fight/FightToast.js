/**
 * Created by jsroads on 2016/8/25.16:31
 * Note:
 */
"use strict";
var FightMagLayer = cc.Layer.extend({
    ctor: function (msg) {
        this._super();
    },
    win:function () {
        cc.director.getRunningScene().addChild(this);
        var layer1 = new cc.LayerColor(cc.color(0, 0, 0, 120), GC.w, GC.h);
        layer1.attr({
            anchorX:0,
            anchorY:0
        });
        layer1.ignoreAnchorPointForPosition(false);
        this.addChild(layer1);
        this.gameBg = new cc.Sprite("#fight_win_bg.png");//因为素材已经加载所以 前面有#
        var rect =  this.gameBg.getBoundingBox();
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
        //因为素材已经加载所以 前面有#  初始化 开始菜单
        var startBtnNormal = new cc.Sprite("#fight_other_w.png");
        var startBtnSelected = new cc.Sprite("#fight_other_w_s.png");
        var startBtnDisable = new cc.Sprite("#fight_other_w_d.png");

        var startSprite = new cc.MenuItemSprite(startBtnNormal,startBtnSelected,startBtnDisable,function (){
            AudioContror.onButtonEffect(res.mm_btneffect);
            this.btnBack(true);
        }.bind(this));
        var menu = new cc.Menu(startSprite);
        menu.x = GC.w_2;
        menu.y = 200;
        this.addChild(menu);
        AudioContror.onButtonEffect(res.mm_coin);
    },
    btnBack:function (isWin) {
        cc.director.getRunningScene().reseGame(isWin);
        AudioContror.onButtonEffect(res.mm_btneffect);
        this.removeAllChildren(true);
        this.removeFromParent(true);
    },
    lose:function () {
        cc.director.getRunningScene().addChild(this);
        var layer1 = new cc.LayerColor(cc.color(0, 0, 0, 120), GC.w, GC.h);
        layer1.attr({
            anchorX:0,
            anchorY:0
        });
        layer1.ignoreAnchorPointForPosition(false);
        this.addChild(layer1);
        this.gameBg = new cc.Sprite("#fight_lose_bg.png");//因为素材已经加载所以 前面有#
        var rect =  this.gameBg.getBoundingBox();
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
        //因为素材已经加载所以 前面有#  初始化 开始菜单
        var startBtnNormal = new cc.Sprite("#fight_other.png");
        var startBtnSelected = new cc.Sprite("#fight_other_s.png");
        var startBtnDisable = new cc.Sprite("#fight_other_d.png");

        var startSprite = new cc.MenuItemSprite(startBtnNormal,startBtnSelected,startBtnDisable,function (){
            AudioContror.onButtonEffect(res.mm_btneffect);
            this.btnBack(false);
        }.bind(this));
        var menu = new cc.Menu(startSprite);
        menu.x = GC.w_2;
        menu.y = 200;
        this.addChild(menu);
        AudioContror.onButtonEffect(res.mm_lose);
    },
    onExit:function () {
        this._super();
    }
});
var FightToast = FightToast||{};
FightToast.layer = null;
FightToast.win = function () {
    cc.log("jsroads:----:"+JSON.stringify("heree"));
    if(cc.sys.isObjectValid(FightToast.layer)){
        FightToast.layer.win();
        cc.log("jsroads:----:"+JSON.stringify("win"));
    }else {
        FightToast.layer = new FightMagLayer();
        cc.log("jsroads:----:"+JSON.stringify("FightMagLayer"));
        FightToast.layer.win();
    }
};
FightToast.lose = function () {
    if(cc.sys.isObjectValid(FightToast.layer)){
        FightToast.layer.lose();
    }else {
        FightToast.layer = new FightMagLayer();
        FightToast.layer.lose();
    }
};