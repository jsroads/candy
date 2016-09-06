/**
 * Created by jsroads on 2016/8/23.19:37
 * Note: 玩家自己血量对象
 */
"use strict";
var PlayerHp = PlayerHp||{};
PlayerHp.hp = null;
/**
 *  初始化 玩家自己的血量
 * @param node 血条父容器
 * @param name 血条归属者
 * @param playerCurHp 当前血量
 * @param playerMaxHp 总血量
 */
PlayerHp.initHp = function (node,name,playerCurHp,playerMaxHp) {
    if(playerMaxHp <=0)return;
    if(cc.sys.isObjectValid(PlayerHp.hp)){
        PlayerHp.hp.removeFromParent(true);
    }
    PlayerHp.hp = new PlayerMc(name,playerCurHp,playerMaxHp);
    PlayerHp.hp.retain();
    PlayerHp.hp.attr({
        x:Library.MAP_X+Library.GRID_SIZE/4,
        y:Library.MAP_Y+4.5*Library.GRID_SIZE,
        anchorX:0,
        anchorY:0
    });
    if(!PlayerHp.hp.getParent()){
        node.addChild(PlayerHp.hp);
    }
};
PlayerHp.backHp = function (node,playerCurHp,playerMaxHp,callback) {
    if(playerMaxHp <=0)return;
    PlayerHp.hp.backHp(playerCurHp,playerMaxHp,callback);
    if(!PlayerHp.hp.getParent())node.addChild(PlayerHp.hp);
};
/**
 *  显示血量  可能是减掉血（正数） 或者加血（负数）
 * @param hurtHp 伤害血量
 */
PlayerHp.showHp = function (hurtHp,callback) {
    PlayerHp.hp.showHp(hurtHp,callback);
};


var PlayerMc = cc.Sprite.extend({
    playerName:"PLAYER",
    playerCurHp:0,//当前血量
    playerMaxHp:0,//总血量 默认玩家在本局中 总血量不变
    oldPercent:0,//上一次血量出事百分比
    curPercent:0,//本次血量出事百分比
    hpMovie:false,//初始化或者恢复血量有无动画效果
    ctor: function (name,playerCurHp,playerMaxHp) {
        this._super("#plyar_hp_bg.png");

        this.playerName = name;
        this.playerCurHp = playerCurHp;
        this.playerMaxHp = playerMaxHp;
        this.oldPercent = this.curPercent;
        this.hpContainer = new cc.ProgressTimer(new cc.Sprite("#plyar_hp_c.png"));
        this.hpContainer.type = cc.ProgressTimer.TYPE_BAR;
        this.hpContainer.midPoint = cc.p(0, 0);
        this.hpContainer.barChangeRate = cc.p(1, 0);
        this.hpContainer.anchorX = 0;
        this.hpContainer.anchorY = 0;
        this.addChild(this.hpContainer);

        //文本
        this.label = new cc.LabelTTF(this.playerCurHp+"/"+this.playerMaxHp,'Arial', 20, cc.size(320,32),cc.TEXT_ALIGNMENT_CENTER);
        this.label.x = 225;
        this.label.y = 15;
        this.label.setFontFillColor(cc.color(255,255,255,255));
        this.label.enableStroke(cc.color(0,0,0,255),2);
        this.addChild(this.label);
        //心形
        this.head = new cc.Sprite("#plyar_hp_h.png");
        this.head.attr({
            anchorX:0,
            anchorY:0
        });
        this.addChild(this.head);

        this.curPercent = Math.ceil(this.playerCurHp/this.playerMaxHp*100);
        this.action = cc.sequence(cc.progressFromTo(.5,this.oldPercent,this.curPercent)
            ,cc.callFunc(this.onCallback.bind(this), this, "Hi!"));
        if(this.hpMovie){
            this.hpContainer.runAction(this.action);
        }else{
            // cc.log("jsroads:----this.curPercent"+JSON.stringify(this.curPercent));
            this.hpContainer.setPercentage(this.curPercent);
            this.setHpText(this.playerCurHp,this.playerMaxHp);//设置血量数字
        }
    },
    /**
     *  改变血量
     * @param hurtHp
     */
    showHp:function (hurtHp,callback) {
        this.callback = callback;
        this.oldPercent = this.curPercent;
        this.playerCurHp -= hurtHp;
        this.playerCurHp = this.playerCurHp<0?0:this.playerCurHp;
        this.playerCurHp = this.playerCurHp>this.playerMaxHp?this.playerMaxHp:this.playerCurHp;
        this.curPercent = Math.ceil(this.playerCurHp/this.playerMaxHp*100);
        // this.hpContainer.setPercentage(this.curPercent);
        // cc.log("jsroads:----:"+JSON.stringify(this.oldPercent));
        // cc.log("jsroads:----:"+JSON.stringify(this.curPercent));
        this.action = cc.sequence(cc.progressFromTo(.5,this.oldPercent,this.curPercent)
            ,cc.callFunc(this.onCallback, this, "showHp"));
        this.hpContainer.runAction(this.action);

        var strTxt = "";
        var txtUrl = "";
        if(hurtHp>0){
            strTxt ="-"+hurtHp;
            txtUrl = res.mm_fight_number_fnt;
            AudioContror.onButtonEffect(res.mm_break);
        }else{
            strTxt ="+"+Math.abs(hurtHp);
            txtUrl = res.mm_level_seq_upon_entering_fnt;
            AudioContror.onButtonEffect(res.mm_lineline);
        }
        var fightLabel = new cc.LabelBMFont(strTxt, txtUrl);
        fightLabel.x = GC.w_2-100;
        fightLabel.y =  GC.h_2+80;
        fightLabel.scale = .75;
        cc.director.getRunningScene().addChild(fightLabel);

        var action = cc.sequence(cc.spawn(
            cc.scaleBy(.5, 1.25),
            cc.moveTo(.5, cc.p(fightLabel.x, fightLabel.y+60)),
            cc.fadeOut(.75)),
            cc.callFunc(this.onCallback3.bind(this), this, fightLabel));
        fightLabel.runAction(action);
        this.scheduleUpdate();
    },
    onCallback3:function(fightLabel){
        if(fightLabel){
            fightLabel.removeFromParent(true);
        }
    },
    /**
     *  血量播放完之后 回调函数
     * @param value
     */
    onCallback:function(node,value){
        this.unscheduleUpdate(); //移除schedule
        this.setHpText(this.playerCurHp,this.playerMaxHp);//设置血量数字
        if(this.curPercent<=0){
            // cc.log("jsroads:----:"+JSON.stringify("The Game is Over !!"));
        }
        cc.log("jsroads:----value:"+JSON.stringify(value));
        if(value === "showHp")this.callback();
        if(value === "backHp")this.callbackHp();
    },
    setHpText:function (curHp,maxHp) {
        this.label.string = curHp+"/"+maxHp;//设置血量数字
    },
    /**
     * 玩家使用某种技能 血量恢复(待拓展)
     */
    backHp:function(hp,maxHp,callback){
        this.callbackHp = callback;
        this.playerMaxHp = maxHp;
        this.playerCurHp = hp>this.playerMaxHp?this.playerMaxHp:hp;
        this.oldPercent = this.curPercent;
        this.curPercent = Math.ceil(this.playerCurHp/this.playerMaxHp*100);
        this.hpContainer.setPercentage(this.curPercent);
        var time = parseInt((this.curPercent-this.oldPercent)/10);
        this.action = cc.sequence(cc.progressFromTo(.4+time*.05,this.oldPercent,this.curPercent)
            ,cc.callFunc(this.onCallback.bind(this), this, "backHp"));
        this.hpContainer.runAction(this.action);
        this.scheduleUpdate();
        // cc.log("jsroads:---------setHpText---:"+JSON.stringify("this is move @@@@@@@@@"));
        AudioContror.onButtonEffect(res.mm_lineline);
    },
    update:function (dt) {
        var curHp = parseInt((this.playerMaxHp*this.hpContainer.getPercentage())/100);
        this.setHpText(curHp,this.playerMaxHp);//设置血量数字
        // cc.log("jsroads:----:"+JSON.stringify("update"));
    },
    clerarSelf:function(){
        this.hpContainer.stopAllActions();
        this.unscheduleUpdate(); //移除schedule
        this.removeFromParent(true);
    }
});