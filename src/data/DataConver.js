/**
 * Created by jsroads on 2016/8/9.18:00
 * Note: 游戏关卡数据算法
 */
"use strict";
var DataConver = DataConver||{};

/**
 *  得到颜色数组
 * @param cannotArray
 * @returns {Array}
 */
DataConver.getColorArray = function(cannotArray){
    var array = [];
    for (var i = 0;i<Library.CANDY_COLOR_LIST.length;i++ ){
        if(cannotArray.indexOf(Library.CANDY_COLOR_LIST[i])!=-1){
            continue;
        }
        array.push(Library.CANDY_COLOR_LIST[i]);
    }
    return array;
};
/**
 *  暂存数据 或者转换
 * @param first 接收方
 * @param last  传递方
 */
DataConver.cloneCandyInfo =  function (first,last) {
    first.candyName = last.candyName;
    first.line = last.line;
    first.row = last.row;
    first.rect = {x:0,y:0,width:Library.GRID_SIZE,height:Library.GRID_SIZE};
    first.rect.x = last.rect.x;
    first.rect.y = last.rect.y;
};
/**
 * 通过检查找出要消失的小球 并归类
 * @param cur_map
 * @returns {Array}
 */
DataConver.checkDisappear  =  function (cur_map) {
    var dispear_list=[];//最后返回的数组
    var dis_line_list=[];
    var dis_row_list=[];
    for(var _line=0;_line<Library.LINE_SIZE;_line++){
        var d_l_list_0=[];
        var d_l_list_1=[];
        for(var _row=0;_row<Library.ROW_SIZE;_row++){
            if(_row>=2&&_line<5){
                //因为是6列 可能是两个颜色 比如 3个金色 3个紫色  PS:如果谁有更好的算法，请麻烦告知作者  jsroads@163.com  不胜感激
                if(cur_map[_line][_row-2].candyColor==cur_map[_line][_row-1].candyColor
                    &&cur_map[_line][_row-2].candyColor==cur_map[_line][_row].candyColor){
                    if(d_l_list_0.length>0&&d_l_list_0[0].candyColor!=cur_map[_line][_row].candyColor){
                        if(d_l_list_1.indexOf(cur_map[_line][_row-2])==-1)d_l_list_1.push(cur_map[_line][_row-2]);
                        if(d_l_list_1.indexOf(cur_map[_line][_row-1])==-1)d_l_list_1.push(cur_map[_line][_row-1]);
                        if(d_l_list_1.indexOf(cur_map[_line][_row])==-1)d_l_list_1.push(cur_map[_line][_row]);
                    }else{
                        if(d_l_list_0.indexOf(cur_map[_line][_row-2])==-1)d_l_list_0.push(cur_map[_line][_row-2]);
                        if(d_l_list_0.indexOf(cur_map[_line][_row-1])==-1)d_l_list_0.push(cur_map[_line][_row-1]);
                        if(d_l_list_0.indexOf(cur_map[_line][_row])==-1)d_l_list_0.push(cur_map[_line][_row]);
                    }
                }
            }
        }
        //因为是6列 可能是两个颜色 比如 3个金色 3个紫色
        if(d_l_list_0.length&&d_l_list_1.length){
            dis_line_list.push(d_l_list_0);
            dis_line_list.push(d_l_list_1);
        }else{
            if(d_l_list_0.length)dis_line_list.push(d_l_list_0);
            if(d_l_list_1.length)dis_line_list.push(d_l_list_1);
        }
    }

    //对于行就无所谓了 五个中只会有一种颜色组成小组
    for(var row_=0;row_<Library.ROW_SIZE;row_++){
        var dis_row_array=[];
        for(var line_=0;line_<Library.LINE_SIZE;line_++){
            if(line_>=2&&line_<5){
                if(cur_map[line_-2][row_].candyColor==cur_map[line_-1][row_].candyColor&&cur_map[line_-2][row_].candyColor==cur_map[line_][row_].candyColor){
                    if(dis_row_array.indexOf(cur_map[line_-2][row_])==-1)dis_row_array.push(cur_map[line_-2][row_]);
                    if(dis_row_array.indexOf(cur_map[line_-1][row_])==-1)dis_row_array.push(cur_map[line_-1][row_]);
                    if(dis_row_array.indexOf(cur_map[line_][row_])==-1)dis_row_array.push(cur_map[line_][row_]);
                }
            }
        }
        if(dis_row_array.length)dis_row_list.push(dis_row_array);
    }


    //-----------------判断几种情况--------------------

    //都没有消除的时候
    if(dis_row_list.length==0&&dis_line_list.length==0){
        return dispear_list;
    }
    //只有列消除的时候
    if(dis_line_list.length==0){
        dispear_list=dis_row_list;
        return dispear_list;
    }
    //只有行消除的时候
    if(dis_row_list.length==0){
        dispear_list=dis_line_list;
        return dispear_list;
    }
    //行和列都有消除的时候
    if(dis_row_list.length&&dis_line_list.length){
        //先把所有的数组连接一起
        var line$rowArray = dis_row_list.concat(dis_line_list);
        //把颜色不同的先检查开  颜色不同的肯定不是一组
        var _$_a_array=[];
        var _$_b_array=[];
        var _$_c_array=[];
        var _$_d_array=[];
        var _$_e_array=[];
        var _$_f_array=[];
        for(var _$line=0;_$line<line$rowArray.length;_$line++){
            switch(line$rowArray[_$line][0].candyColor){
                case Library.CANDY_COLOR_LIST[0]:
                    _$_f_array.push(line$rowArray[_$line]);
                    break;
                case Library.CANDY_COLOR_LIST[1]:
                    _$_a_array.push(line$rowArray[_$line]);
                    break;
                case Library.CANDY_COLOR_LIST[2]:
                    _$_b_array.push(line$rowArray[_$line]);
                    break;
                case Library.CANDY_COLOR_LIST[3]:
                    _$_c_array.push(line$rowArray[_$line]);
                    break;
                case Library.CANDY_COLOR_LIST[4]:
                    _$_d_array.push(line$rowArray[_$line]);
                    break;
                case Library.CANDY_COLOR_LIST[5]:
                    _$_e_array.push(line$rowArray[_$line]);
                    break;
                default:
            }
        }
        if(_$_a_array.length==1){
            dispear_list=dispear_list.concat(_$_a_array);
        }else if(_$_a_array.length>=2){
            dispear_list=dispear_list.concat(DataConver.candyColorCheck(_$_a_array));
        }
        if(_$_b_array.length==1){
            dispear_list=dispear_list.concat(_$_b_array);
        }else if(_$_b_array.length>=2){
            dispear_list=dispear_list.concat(DataConver.candyColorCheck(_$_b_array));
        }
        if(_$_c_array.length==1){
            dispear_list=dispear_list.concat(_$_c_array);
        }else if(_$_c_array.length>=2){
            dispear_list=dispear_list.concat(DataConver.candyColorCheck(_$_c_array));
        }
        if(_$_d_array.length==1){
            dispear_list=dispear_list.concat(_$_d_array);
        }else if(_$_d_array.length>=2){
            dispear_list=dispear_list.concat(DataConver.candyColorCheck(_$_d_array));
        }
        if(_$_e_array.length==1){
            dispear_list=dispear_list.concat(_$_e_array);
        }else if(_$_e_array.length>=2){
            dispear_list=dispear_list.concat(DataConver.candyColorCheck(_$_e_array));
        }
        if(_$_f_array.length==1){
            dispear_list=dispear_list.concat(_$_f_array);
        }else if(_$_f_array.length>=2){
            dispear_list=dispear_list.concat(DataConver.candyColorCheck(_$_f_array));
        }

        return dispear_list;
    }
    return dispear_list;
};
/**
 *  颜色检查
 * @param color_list
 * @returns {Array}
 */
DataConver.candyColorCheck = function(color_list){
    var join_candy;
    var del_list = [];
    for(var i=0;i<color_list.length;i++){
        if(del_list.indexOf(i)!=-1){
            continue;
        }
        for(var j=0;j<color_list.length;j++){
            if(del_list.indexOf(j)!=-1){
                continue;
            }
            var temp_list_1=color_list[i];
            var temp_list_2=color_list[j];
            if(temp_list_1==temp_list_2)continue;
            join_candy=DataConver.foundSameIndex(temp_list_1,temp_list_2)
            if(join_candy){
                del_list.push(j);
                temp_list_2.splice(temp_list_2.indexOf(join_candy),1);
                for (var key in temp_list_2){
                    if(temp_list_1.indexOf(temp_list_2[key])==-1)temp_list_1.push(temp_list_2[key]);
                }
            }
        }
    }
    var result_list=[];
    for(var del=0;del<color_list.length;del++){
        if(del_list.indexOf(del)!=-1)continue;
        result_list.push(color_list[del]);
    }
    return result_list;
};
/**
 * 两个数组如果有交叉 找出重合的 比如性状 十 土 T L
 * @param ball_Array_0
 * @param ball_Array_1
 * @returns {*}
 */
DataConver.foundSameIndex = function(ball_Array_0,ball_Array_1){
    for(var i=0;i<ball_Array_1.length;i++){
        if(	ball_Array_0.indexOf(ball_Array_1[i])!=-1){
            return ball_Array_1[i];
        }
    }
    return null;
};
//开始检查 此次检查的目标是算出总共 的个数 //应该还有更好的办法 待商定
DataConver.checkBalls = function(cur_map){
    var dispearArray=[];
    for(var _line =0;_line<cur_map .length;_line++){
        for(var _row =0;_row<cur_map [_line].length;_row++){
            if(_line<2&&_row>=2){
                if(cur_map [_line][_row-2].candyColor==cur_map [_line][_row-1].candyColor&&cur_map [_line][_row-2].candyColor==cur_map [_line][_row].candyColor&&cur_map [_line][_row-1].candyColor==cur_map [_line][_row].candyColor){
                    if(dispearArray.indexOf(cur_map [_line][_row-2])==-1)dispearArray.push(cur_map [_line][_row-2]);
                    if(dispearArray.indexOf(cur_map [_line][_row-1])==-1)dispearArray.push(cur_map [_line][_row-1]);
                    if(dispearArray.indexOf(cur_map [_line][_row])==-1)dispearArray.push(cur_map [_line][_row]);
                }
            }
            if(_row<2&&_line>=2&&_line<5){
                if(cur_map [_line-2][_row].candyColor==cur_map [_line-1][_row].candyColor&&cur_map [_line-2][_row].candyColor==cur_map [_line][_row].candyColor&&cur_map [_line-1][_row].candyColor==cur_map [_line][_row].candyColor){
                    if(dispearArray.indexOf(cur_map [_line-2][_row])==-1)dispearArray.push(cur_map [_line-2][_row]);
                    if(dispearArray.indexOf(cur_map [_line-1][_row])==-1)dispearArray.push(cur_map [_line-1][_row]);
                    if(dispearArray.indexOf(cur_map [_line][_row])==-1)dispearArray.push(cur_map [_line][_row]);
                }
            }
            if(_row>=2&&_line>=2&&_line<5){
                if(cur_map [_line][_row-2].candyColor==cur_map [_line][_row-1].candyColor&&cur_map [_line][_row-2].candyColor==cur_map [_line][_row].candyColor&&cur_map [_line][_row-1].candyColor==cur_map [_line][_row].candyColor){
                    if(dispearArray.indexOf(cur_map [_line][_row-2])==-1)dispearArray.push(cur_map [_line][_row-2]);
                    if(dispearArray.indexOf(cur_map [_line][_row-1])==-1)dispearArray.push(cur_map [_line][_row-1]);
                    if(dispearArray.indexOf(cur_map [_line][_row])==-1)dispearArray.push(cur_map [_line][_row]);
                }
                if(cur_map [_line-2][_row].candyColor==cur_map [_line-1][_row].candyColor&&cur_map [_line-2][_row].candyColor==cur_map [_line][_row].candyColor&&cur_map [_line-1][_row].candyColor==cur_map [_line][_row].candyColor){
                    if(dispearArray.indexOf(cur_map [_line-2][_row])==-1)dispearArray.push(cur_map [_line-2][_row]);
                    if(dispearArray.indexOf(cur_map [_line-1][_row])==-1)dispearArray.push(cur_map [_line-1][_row]);
                    if(dispearArray.indexOf(cur_map [_line][_row])==-1)dispearArray.push(cur_map [_line][_row]);
                }
            }
        }
    }
    return dispearArray;
};

// 交换数组元素
DataConver.swapItems = function(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};

// 上移
DataConver.upRecord = function(arr, $index) {
    if($index == 0) {
        return;
    }
    swapItems(arr, $index, $index - 1);
};

// 下移
DataConver.downRecord = function(arr, $index) {
    if($index == arr.length -1) {
        return;
    }
    swapItems(arr, $index, $index + 1);
};

DataConver.checkBossCombat = function (list) {
    FightData.roundList =[];//战斗数据对象
    FightData.PLAYER_DIE =false;//玩家是否已经输掉
    FightData.BOSS_DIE =false;//Boss 是否已经死亡
    var round = new Round();
    round.target = FightData.PLAYER;
    round.attacker = FightData.CUR_BOSS;
    round.buffType = FightData.BUFF_TYPE_GEN;
    round.hurthp = FightData.LEVEL_HURT_LIST[FightData.PLAY_LEVEL]+100;
    FightData.roundList.push(round);
    FightData.playerCurHp -= round.hurthp;
    cc.log("jsroads:----:"+JSON.stringify(FightData.playerCurHp));
    FightData.PLAYER_DIE = FightData.playerCurHp<=0?true:false;
};


DataConver.checkPlayerCombat = function (list) {
    FightData.playerHurt = 0;
    var count = 0;
    var isAddHp = false;
    var round = new Round();
    round.target = FightData.CUR_BOSS;
    round.attacker = FightData.PLAYER;
    round.buffType = FightData.BUFF_TYPE_GEN;
    if(!FightData.roundList)FightData.roundList = new RoundList();
    for(var line=0;line<list.length;line++) {
        for (var row = 0; row < list[line].length; row++) {
            // cc.log("the"+(list[line][row].line+1)+"line &"+"the "
            //     +(list[line][row].row+1)+"row $"+"The Number is "+list.length+"Time Dispear"+count);
            count++;
            switch (list[line][row].candyColor){
                case Library.CANDY_COLOR_LIST[0]:
                    round.hurthp +=70;
                    break;
                case Library.CANDY_COLOR_LIST[1]:
                    round.hurthp +=80;
                    break;
                case Library.CANDY_COLOR_LIST[2]:
                    round.hurthp +=90;
                    break;
                case Library.CANDY_COLOR_LIST[3]:
                    round.hurthp +=100;
                    break;
                case Library.CANDY_COLOR_LIST[4]:
                    round.hurthp +=110;
                    break;
                case Library.CANDY_COLOR_LIST[5]:
                    round.hurthp +=50;
                    isAddHp = true;
                    var roundBack = new Round();
                    roundBack.target = FightData.PLAYER;
                    roundBack.attacker = FightData.PLAYER;
                    roundBack.buffType = FightData.BUFF_TYPE_GEN;
                    roundBack.hurthp -=100;
                    break;
            }
        }
    }
    FightData.playerHurt+=round.hurthp;
    FightData.bossCurHP -= FightData.playerHurt;
    FightData.BOSS_DIE = FightData.bossCurHP<=0?true:false;

    cc.log("jsroads:----FightData.BOSS_DIE:"+JSON.stringify(FightData.BOSS_DIE));
    cc.log("jsroads:----FightData.bossCurHP:"+JSON.stringify(FightData.bossCurHP));

    if(FightData.BOSS_DIE==false&&isAddHp){
        FightData.roundList.unshift(roundBack);
    }
    if(round.hurthp>0)FightData.roundList.unshift(round);
};
// DataConver.cliper = function(frameName){
//     //创建一个遮罩的模板
//     var sten = new cc.Sprite(frameName);
//     sten.attr({
//         anchorX:0,
//         anchorY:0
//     });
//     //创建一个ClippingNode 并设置一些基础属性 容器宽高与模板有关
//     var clipnode = new cc.ClippingNode();
//     clipnode.attr({
//         stencil:sten,
//
//         anchorX:0.5,
//
//         anchorY:0.5,
//
//         alphaThreshold:0.8,//设置裁剪透明值阀值 默认值为1 等于1時 alpha = 0的部分也被裁剪
//
//     });
//     return clipnode;
// };