/**
 * Created by jsroads on 2016/8/24.9:49
 * Note: 战斗会合
 */
"use strict";
var Round = cc.Class.extend({
    target:null,//被攻击对象
    attacker:null,//攻击者对象
    hurthp:0,//造成的伤害
    backHp:0,//回血
    buffType:0,//攻击类型，这个将来可以拓展，比如中毒，增加自己的时间，或者本次伤害出发了被动技能
    buff:{},//攻击buff
    fight:function (round) {

    }
});