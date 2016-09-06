/**
 * Created by jsroads on 2016/8/13.16:16
 * Note:
 */
"use strict";
var SoundSprite = cc.Node.extend({
    ctor: function () {
        this._super();
        this.setAnchorPoint(0,0);
        var sound_n = new cc.MenuItemSprite(new cc.Sprite("#sound_n_n.png"),
            new cc.Sprite("#sound_n_n_t.png"),
            new cc.Sprite("#sound_n_n.png"),null,this);
        var sound_s = new cc.MenuItemSprite(new cc.Sprite("#sound_n_s.png"),
            new cc.Sprite("#sound_n_s_t.png"),
            new cc.Sprite("#sound_n_s.png"),null,this);
        var soundBtn ;
        if(GC.SOUND_ON){
            soundBtn= new cc.MenuItemToggle(sound_s,sound_n, this.soundBtnCallback.bind(this));
        }else{
            soundBtn= new cc.MenuItemToggle(sound_n,sound_s, this.soundBtnCallback.bind(this));
        }
        var teamGroupBtnMenu = new cc.Menu(soundBtn);
        this.addChild(teamGroupBtnMenu);
        this.btnTeamCallback(teamGroupBtnMenu);
    },
    btnTeamCallback: function (){
        // cc.log("cc jsroads:------------: "+JSON.stringify("btnTeamCallback"));
    },
    soundBtnCallback: function (sender){
        GC.SOUND_ON = !GC.SOUND_ON;
        var audioEngine = cc.audioEngine;
        if(GC.SOUND_ON){
            cc.audioEngine.playEffect(res.mm_btneffect);
        }
        else{
            audioEngine.stopAllEffects();
        }
    }
});