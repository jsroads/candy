/**
 * Created by jsroads on 2016/8/24.13:56
 * Note:战斗控制器
 */
"use strict";
var FightController = FightController||{};
FightController.map = {};
FightController.play = function (round,callbackFight) {
    cc.log("jsroads:----callback:"+JSON.stringify(round.target));
    if(round.target == FightData.CUR_BOSS){
        Boss.showHp(round.hurthp,callbackFight);
    }else if(round.target == FightData.PLAYER){
        PlayerHp.showHp(round.hurthp,callbackFight);
    }
};