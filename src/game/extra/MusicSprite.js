/**
 * Created by jsroads on 2016/8/13.15:41
 * Note:
 */
"use strict";
var MusicSprite = cc.Node.extend({
    ctor: function () {
        this._super();
        this.setAnchorPoint(0,0);
        var music_n = new cc.MenuItemSprite(new cc.Sprite("#music_n_n.png"),
            new cc.Sprite("#music_n_n_t.png"),
            new cc.Sprite("#music_n_n.png"),null,this);
        var music_s = new cc.MenuItemSprite(new cc.Sprite("#music_n_s.png"),
            new cc.Sprite("#music_n_s_t.png"),
            new cc.Sprite("#music_n_s.png"),null,this);

        var musicBtn ;
        if(GC.MUSIC_ON){
            musicBtn= new cc.MenuItemToggle(music_s,music_n, this.musicBtnCallback.bind(this));
        }else{
            musicBtn= new cc.MenuItemToggle(music_n,music_s, this.musicBtnCallback.bind(this));
        }
        var teamGroupBtnMenu = new cc.Menu(musicBtn);
        this.addChild(teamGroupBtnMenu);
        this.btnTeamCallback(teamGroupBtnMenu);
    },
    btnTeamCallback: function (){
       // 暂没有作用
    },
    musicBtnCallback: function (sender){
        GC.MUSIC_ON = !GC.MUSIC_ON;
        var audioEngine = cc.audioEngine;
        if(GC.MUSIC_ON){
            if (cc.audioEngine.isMusicPlaying()){
                return;
            }
            cc.audioEngine.playMusic(res.mm_playmusic_mp3, true);
        }
        else{
            audioEngine.stopMusic();
        }
        if(GC.SOUND_ON){
            cc.audioEngine.playEffect(res.mm_btneffect);
        }
    }
});