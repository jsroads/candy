/**
 * Created by jsroads on 2016/8/9.14:44
 * e-mail:jsroads@163.com
 * Note: 整个的游戏设置数据
 * 关于游戏当前关卡数据
 * 移驾  Library.js
 */
"use strict";
var GC = GC||{};
GC.winSize = cc.size(640, 960);//游戏大小

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.TRANSITI_TIME = .35; //游戏转场时间

GC.PLAY_LAYER_TAG = 1000; //战斗层tag

GC.SOUND_ON = true; //音乐的开关状态 音乐和音效是分别控制的
GC.MUSIC_ON = true; //音乐的开关状态 音乐和音效是分别控制的

GC.GAME_STATE_ENUM = {
    HOME : 0,
    PLAY : 1,
    OVER : 2
};
GC.GAME_STATE = GC.GAME_STATE_ENUM.HOME;