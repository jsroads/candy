/**
 * Created by jsroads on 2016/8/13.17:02
 * Note:
 */
"use strict";
var AudioContror = AudioContror||{};
/**
 * 播放背景音乐如果传入类型可以拓展，暂时只有一首
 */
AudioContror.playMusic = function(){
    if (GC.MUSIC_ON) {
        if (cc.audioEngine.isMusicPlaying()) {
            return;
        }
        cc.audioEngine.playMusic(res.mm_playmusic_mp3, true);
    }
};
/**
 * 播放音效
 * @param type
 */
AudioContror.onButtonEffect = function(type){
    type = type||res.mm_btneffect;
    if (GC.SOUND_ON) {
        cc.audioEngine.playEffect(type, false);
    }
};