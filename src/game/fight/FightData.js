/**
 * Created by jsroads on 2016/8/24.10:28
 * Note:
 */
"use strict";
var FightData = FightData||{};
FightData.PLAY_LEVEL = 10;
FightData.PLAY_HP_BASE = 1500;
FightData.BOSS_HP_BASE = 500;
FightData.LEVEL_HURT_LIST = [50,75,100,125,150,175,200,225,250,275,300];
FightData.PLAYER = "player";
FightData.BOSS_1 = "boss_1";
FightData.BOSS_2 = "boss_2";
FightData.BOSS_3 = "boss_3";
FightData.CUR_BOSS = FightData.BOSS_1;
FightData.BUFF_TYPE_GEN ="buff_type_gen";//普通攻击
FightData.BUFF_TYPE_SUPER ="buff_type_super";//暴击
FightData.roundList =[];//战斗数据对象
FightData.PLAYER_DIE =false;//玩家是否已经输掉
FightData.BOSS_DIE =false;//Boss 是否已经死亡

FightData.playerMaxHp = 2000;//玩家总血量
FightData.playerCurHp = 2000;//玩家当前血量

FightData.playerHurt = 0;//玩家本轮伤害总值

FightData.bossMaxHP = 2000;//boss总血量
FightData.bossCurHP = 2000;//boss当前血量

FightData.getPlayerHP = function () {
    FightData.playerMaxHp = FightData.PLAY_HP_BASE+FightData.PLAY_LEVEL*FightData.LEVEL_HURT_LIST[FightData.PLAY_LEVEL];
    return  FightData.playerMaxHp;
};

FightData.getBossHP = function () {
    FightData.bossMaxHP = FightData.BOSS_HP_BASE+FightData.PLAY_LEVEL*FightData.LEVEL_HURT_LIST[FightData.PLAY_LEVEL]*2;
    return FightData.bossMaxHP;
};
