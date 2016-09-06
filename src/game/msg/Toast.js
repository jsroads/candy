/**
 * Created by jsroads on 2016/8/23.16:28
 * Note:
 */
"use strict";
var MsgLayer = cc.Layer.extend({
    ctor: function (msg) {
        this._super();
    },
    show:function (msg) {
        // if(this.msg_sprite&&this.msg_sprite.getParent())this.msg_sprite.removeFromParent(true);
        this.removeAllChildren(true);
        this.msg_sprite = new cc.Sprite("#"+msg);
        this.addChild(this.msg_sprite);
        this.msg_sprite.x = GC.w_2;
        this.msg_sprite.y = GC.h_2-150;
        if(!this.parent)cc.director.getRunningScene().addChild(this);
        this.move();
    },
    move:function () {
        var spawn = cc.sequence(cc.spawn(
            cc.scaleBy(1, 1.25),
            cc.moveTo(1, cc.p(GC.w_2, GC.h_2-60)),
            cc.fadeOut(1)),
            cc.callFunc(this.onCallbackMove.bind(this), this, "Move!"));
        this.msg_sprite.runAction(spawn);
    },
    onCallbackMove:function (move) {
        if(this.msg_sprite)this.msg_sprite.removeFromParent(true);
        if(this)this.removeFromParent(true);
    }
});
var Toast = Toast||{};
Toast.layer = null;
Toast.show = function (msg) {
    if(!Toast.layer ){
        Toast.layer = new MsgLayer();
        Toast.layer.retain();
        Toast.layer.show(msg);
    }else{
        Toast.layer.show(msg);
    }
};
Toast.playEffect = function (list) {
    var length = list.length;
    var e_name ;
    switch (true){
        case (length>=8):
            e_name = res.mm_contnuousmatch5;
            Toast.show(Msg.UNBELIEVEVABLE);
            break;
        case (length>=7):
            e_name = res.mm_contnuousmatch4;
            Toast.show(Msg.AMAZING);
            break;
        case (length>=6):
            e_name = res.mm_contnuousmatch3;
            Toast.show(Msg.EXCELLENT);
            break;
        case (length>=5):
            e_name = res.mm_contnuousmatch2;
            Toast.show(Msg.GREAT);
            break;
        case (length>=4):
            e_name = res.mm_contnuousmatch1;
            Toast.show(Msg.GOOD);
            break;
        default:
    }
    if(e_name)AudioContror.onButtonEffect(e_name);
};