/**
 * Created by jsroads on 2016/8/10.19:27
 * Note:
 */
"use strict";
var CandyProcessMc = CandyProcessMc||{};
CandyProcessMc.process_mc = null;
CandyProcessMc.initProcess = function (node,time) {
    CandyProcessMc.process_mc =  new CandyProcess(time);
    node.addChild(this.process_mc);
    CandyProcessMc.process_mc.attr({x:50,y:120});
    AudioContror.onButtonEffect(res.mm_deadlinestep);
};
CandyProcessMc.clear = function () {
    if(CandyProcessMc.process_mc){
        CandyProcessMc.process_mc.clerarSelf();
    }
};

var CandyProcess = cc.Sprite.extend({
    ctor: function (time) {
        this._super("#progressTimer_bg.png");
        this.init(time);
    },

    init: function (time) {
        var action = cc.sequence(cc.progressFromTo(time,100,0)
            ,cc.callFunc(this.onCallback, this, "Hi!")  );
        this.left = new cc.ProgressTimer(new cc.Sprite("#progressTimer_s.png"));
        this.left.type = cc.ProgressTimer.TYPE_BAR;
        this.left.midPoint = cc.p(0, 0);
        this.left.barChangeRate = cc.p(1, 0);
        this.addChild(this.left);
        this.left.x = 55;
        this.left.y = 10;
        this.left.retain();
        this.left.runAction(action);
    },
    onCallback:function(){

    },
    clerarSelf:function(){
        if(cc.sys.isObjectValid(this.left)){
            this.left.release();
            this.left.stopAllActions();
        }
        if(cc.sys.isObjectValid(this)){this.removeFromParent(true);}
    }
});