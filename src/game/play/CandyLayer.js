/**
 * Created by jsroads on 2016/8/9.19:01
 * Note: 糖果（显示对象）操作层
 */
"use strict";
var CandyLayer = cc.Layer.extend({
    container:null,//糖果父容器，主要做遮罩用
    listener:null,//侦听
    maskLayer:null,//阻止交互层（播放动画的时候，避免用户操作）
    ctor:function(){
        this._super();
        this.container = new cc.Node();
        this.container.width = GC.w;
        this.container.height = GC.h;
        this.initListener();
        ClipSp.clipNode(this);

        this.maskLayer = new cc.ModelLayerColor(20);
        this.addChild(this.maskLayer,20);
        this.setMaskLayerVisible(false);

        this.initCandyList();
        Library.locked = false;
        FightData.PLAY_LEVEL = 0;
        FightData.playerCurHp = FightData.getPlayerHP();
        FightData.bossCurHP = FightData.getBossHP();
        //初始化 playerCurHp 之所以不单单传 playerMaxHp，是因为 可能是中途退出 再次进入（为以后联网做拓展用）
        cc.log("jsroads:----:"+JSON.stringify(" come ready !"));
        cc.log("jsroads:----:FightData.PLAY_LEVEL"+JSON.stringify(FightData.PLAY_LEVEL));
        cc.log("jsroads:----:FightData.bossCurHP "+JSON.stringify(FightData.bossCurHP));
        PlayerHp.initHp(this,FightData.PLAYER,FightData.playerCurHp,FightData.playerMaxHp);
        Boss.initHp(this,FightData.CUR_BOSS,FightData.bossCurHP,FightData.bossMaxHP);
        Boss.setBossStyle();
        this.levLabel = new cc.LabelBMFont(FightData.PLAY_LEVEL.toString(), res.mm_fight_lev_fnt);
        this.levLabel.x = GC.w - 65;
        this.levLabel.y = GC.h/2 +145;
        this.levLabel.scale = .75;
        this.addChild(this.levLabel);

    },

    /**
     * 初始化 整个界面 小球的分布 10行 六列
     */
    initCandyList:function(){
        for(var line=0;line<Library.LINE_SIZE;line++) {
            for (var row = 0; row < Library.ROW_SIZE; row++) {
                this.initBalls(line,row)
            }
        }
    },
    /**
     * 设置 不不交互层的显示与否
     */
    setMaskLayerVisible:function(visible){
        this.maskLayer.visible = visible;
    },
    /**
     *  创建小球的分布 对于初始化的小球，要成不能有消除的行和列 所以要这样算
     * @param line
     * @param row
     */
    initBalls:function(line,row){
        var colorLength = Library.CANDY_COLOR_LIST.length;//得到小球颜色数组的长度便于后面取索引
        var colorIndex = 0;//小球颜色的索引
        var candy;//声明一个小球
        var newColorArray=[];//创建一个新的颜色数组 可能有的颜色已经不能选择
        var canNotColorArray=[];//不能选择的颜色
        //当行小于3行这个时候只对列进行检查
        if(line<2&&row>=2){
            if(Library.map[line][row-2].candyColor==Library.map[line][row-1].candyColor){
                colorLength--;
                if(canNotColorArray.indexOf(Library.map[line][row-2].candyColor)==-1){
                    canNotColorArray.push(Library.map[line][row-2].candyColor);
                }
            }
        }
        //同理 当列小于3列 只对行进行检查
        if(row<2&&line>=2){
            if(Library.map[line-2][row].candyColor==Library.map[line-1][row].candyColor){
                colorLength--;
                if(canNotColorArray.indexOf(Library.map[line-2][row].candyColor)==-1){
                    canNotColorArray.push(Library.map[line-2][row].candyColor);
                }
            }
        }
        //行和列都大于2的时候都需要检查
        if(row>=2&&line>=2){
            if(Library.map[line][row-2].candyColor==Library.map[line][row-1].candyColor){
                colorLength--;
                if(canNotColorArray.indexOf(Library.map[line][row-2].candyColor)==-1){
                    canNotColorArray.push(Library.map[line][row-2].candyColor);
                }
            }
            if(Library.map[line-2][row].candyColor==Library.map[line-1][row].candyColor){
                colorLength--;
                if(canNotColorArray.indexOf(Library.map[line-2][row].candyColor)==-1){
                    canNotColorArray.push(Library.map[line-2][row].candyColor);
                }
            }
        }
        colorIndex = parseInt(Math.random()*colorLength);//随机得到可选颜色的索引
        newColorArray=DataConver.getColorArray(canNotColorArray);
        //创建对象
        candy= new Candy(newColorArray[colorIndex],line,row);
        candy.x=Library.MAP_X+row*Library.GRID_SIZE;
        candy.y=Library.MAP_Y+line*Library.GRID_SIZE;
        candy.retain();
        this.container.addChild(candy);
        Library.map[line][row]=candy;
    },
    // 创建一个事件监听器 OneByOne 为单点触摸  以后主要根据小球的矩形区域判断
    initListener:function(){
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,// 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan:  this.onTouchBeganCard.bind(this),
            onTouchMoved : this.onTouchMovedCard.bind(this),
            onTouchEnded : this.onTouchEndedCard.bind(this),
            onTouchCancelled : this.onTouchCancelledCard.bind(this)

        });
        cc.eventManager.addListener(this.listener, this.container);
    },
    onTouchBeganCard:function (touch, event) {//实现 onTouchBegan 事件处理回调函数
        var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类
        // 获取当前触摸点相对于按钮所在的坐标
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var rect = cc.rect(0, 0, target.getContentSize().width, target.getContentSize().height);
        if (cc.rectContainsPoint(rect, locationInNode)) { // 判断触摸点是否在按钮范围内
            if(locationInNode.y>5*Library.GRID_SIZE-Library.GRID_SIZE/2+Library.MAP_Y
                ||locationInNode.x>6*Library.GRID_SIZE-Library.GRID_SIZE/2+Library.MAP_X
                ||locationInNode.y<Library.MAP_Y-Library.GRID_SIZE/2
                ||locationInNode.x<Library.MAP_X-Library.GRID_SIZE/2){
                cc.log("sorry,please touch the right rect!");
                return false;
            }
            //玩家操作的界面为下面5行
            for (var line = 0; line < Library.map.length; line++) {
                for (var row = 0; row < Library.map[line].length; row++) {
                    var candy = Library.map[line][row];
                    if(cc.rectContainsPoint(candy.rect,locationInNode)){
                        // cc.log("cc jsroads:------------: "+JSON.stringify(candy.candyName));
                        // cc.log("cc jsroads:------------locationInNode: "+JSON.stringify(locationInNode));
                        DataConver.cloneCandyInfo(Library.tempInfo,candy);
                        Library.pathList.length = 0;
                        this.pushPath(candy);
                        this.setCurCandyStyle(candy);
                        this.initMoveCandy(candy);
                        break;
                    }
                }
            }
            return true;
        }
        return false;
    },
    //实现onTouchMoved事件处理回调函数, 触摸移动时触发
    onTouchMovedCard: function (touch, event) {
        //如果倒计时结束，此时moveCandy 已经不存在 或者正在消除的过程中 直接返回
        if(!Library.moveCandy||Library.locked)return;
        // 移动当前按钮精灵的坐标位置
        var target = event.getCurrentTarget();
        var delta = touch.getDelta(); //获取事件数据: delta
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        Library.moveCandy.x += delta.x;
        Library.moveCandy.y += delta.y;
        var line = Library.tempInfo.line;
        var row = Library.tempInfo.row;
        //	小球交换的方向有四个 上 下 左 右
        if(row<5&&Library.map[line][row+1]&&cc.rectContainsPoint(Library.map[line][row+1].rect,locationInNode)){
            // cc.log("candy·s dir is ------------- "+JSON.stringify("right !!!!"));
            //记下 要交换的坐标
            Library.hitPoint = {x:Library.map[line][row+1].x,y:Library.map[line][row+1].y};//碰撞位置坐标
            Library.curPoint = {x:Library.curCandy.x,y:Library.curCandy.y};//当前操作位置坐标
            this.pushPath(Library.map[line][row+1]);//压入路径
            DataConver.cloneCandyInfo(Library.map[line][row],Library.map[line][row+1]);
            //交换数组里面他们的索引
            DataConver.swapItems(Library.map[line],row,row+1);
            DataConver.cloneCandyInfo(Library.map[line][row],Library.tempInfo);
            //原来的小球也移动到新的位置
            this.converCandyPos(Library.map[line][row+1],Library.map[line][row]);
        }
        if(row>0&&Library.map[line][row-1]&&cc.rectContainsPoint(Library.map[line][row-1].rect,locationInNode)){
            // cc.log("candy·s dir is ------------- "+JSON.stringify("left !!!!"));
            //记下 要交换的坐标
            Library.hitPoint = {x:Library.map[line][row-1].x,y:Library.map[line][row-1].y};//碰撞位置坐标
            Library.curPoint = {x:Library.curCandy.x,y:Library.curCandy.y};//当前操作位置坐标
            this.pushPath(Library.map[line][row-1]);//压入路径
            DataConver.cloneCandyInfo(Library.map[line][row],Library.map[line][row-1]);
            //交换数组里面他们的索引
            DataConver.swapItems(Library.map[line],row,row-1);
            DataConver.cloneCandyInfo(Library.map[line][row],Library.tempInfo);
            //原来的小球也移动到新的位置
            this.converCandyPos(Library.map[line][row-1],Library.map[line][row]);
        }
        if(line<4&&Library.map[line+1][row]&&cc.rectContainsPoint(Library.map[line+1][row].rect,locationInNode)){
            // cc.log("candy·s dir is ------------- "+JSON.stringify("up !!!!"));
            //记下 要交换的坐标
            Library.hitPoint = {x:Library.map[line+1][row].x,y:Library.map[line+1][row].y};//碰撞位置坐标
            Library.curPoint = {x:Library.curCandy.x,y:Library.curCandy.y};//当前操作位置坐标
            this.pushPath(Library.map[line+1][row]);//压入路径
            DataConver.cloneCandyInfo(Library.map[line][row],Library.map[line+1][row]);
            //交换数组里面他们的索引
            Library.map[line].splice(row,1,Library.map[line+1][row]);
            Library.map[line+1].splice(row,1,Library.curCandy);
            DataConver.cloneCandyInfo(Library.map[line][row],Library.tempInfo);
            //原来的小球也移动到新的位置
            this.converCandyPos(Library.map[line+1][row],Library.map[line][row]);
        }
        if(line>0&&Library.map[line-1][row]&&cc.rectContainsPoint(Library.map[line-1][row].rect,locationInNode)){
            // cc.log("candy·s dir is ------------- "+JSON.stringify("down !!!!"));
            //记下 要交换的坐标
            Library.hitPoint = {x:Library.map[line-1][row].x,y:Library.map[line-1][row].y};//碰撞位置坐标
            Library.curPoint = {x:Library.curCandy.x,y:Library.curCandy.y};//当前操作位置坐标
            this.pushPath(Library.map[line-1][row]);//压入路径
            DataConver.cloneCandyInfo(Library.map[line][row],Library.map[line-1][row]);
            //交换数组里面他们的索引
            Library.map[line].splice(row,1,Library.map[line-1][row]);
            Library.map[line-1].splice(row,1,Library.curCandy);
            DataConver.cloneCandyInfo(Library.map[line][row],Library.tempInfo);
            //原来的小球也移动到新的位置
            this.converCandyPos(Library.map[line-1][row],Library.map[line][row]);
        }
    },
    // 实现onTouchEnded事件处理回调函数
    onTouchEndedCard: function (touch, event) {
        // cc.log("jsroads:----:"+JSON.stringify(" onTouchEndedCard"));
        this.finishWork();
    },
    finishWork:function(){
        cc.log("jsroads:----:"+JSON.stringify(Library.locked));
        if(Library.locked)return;
        Library.locked = true;
        this.setMaskLayerVisible(true);//蒙版阻止交互
        this.clearMoveCandy();//去掉飘浮的糖果
        this.incombat();//初始化本轮战斗数据
        this.intcheck();//检查消除

    },
    incombat:function () {
        FightData.CUR_BOSS = FightData.BOSS_1;
        if(Library.pathList.length>1)DataConver.checkBossCombat();//初始化本轮战斗数据 以及计算Boss对我的伤害
    },
    // 实现onTouchCancelledCard事件处理回调函数
    onTouchCancelledCard: function (touch, event) {
        //var target = event.getCurrentTarget();
        //cc.log("sprite onTouchCancelledCard.. ");
    },
    setCurCandyStyle: function (candy) {
        Library.curCandy = candy;
        Library.curCandy.setOpacity(150);
    },
    //交换两个糖果的位置 交换数据 播放音效
    converCandyPos:function(fist_mc,second_mc){
        fist_mc.x= Library.hitPoint.x;
        fist_mc.y= Library.hitPoint.y;
        second_mc.x = Library.curPoint.x;
        second_mc.y = Library.curPoint.y;
        DataConver.cloneCandyInfo(Library.tempInfo,Library.curCandy);
        AudioContror.onButtonEffect(res.mm_bubble);
    },
    /**
     *  生成一个跟随 触摸移动的糖果
     * @param candy
     */
    initMoveCandy: function (candy) {
        Library.moveCandy = new Candy(candy.candyColor,candy.line,candy.row);
        Library.moveCandy.x=candy.x;
        Library.moveCandy.y=candy.y;
        Library.moveCandy.scale = 1.25;
        this.container.addChild(Library.moveCandy);
        AudioContror.onButtonEffect(res.mm_drop);
        this.setSchedule();
    },
    /**
     * 清除 被托起 放大的 小球
     */
    clearMoveCandy:function(){
        this.resetSchedule();
        CandyProcessMc.clear();
        if(Library.moveCandy){
            Library.moveCandy.removeFromParent(true);
            Library.moveCandy = null;
        }
        if(Library.curCandy)Library.curCandy.setOpacity(255);
        AudioContror.onButtonEffect(res.mm_drop);
    },
    intcheck:function(){
        Library.dispearList= DataConver.checkDisappear(Library.map);
        if(Library.pathList.length<=1&&!Library.dispearList.length){
            cc.log("jsroads:---@-:"+JSON.stringify(" no path "));
            // if(FightData.BOSS_DIE){
            //     FightToast.win();
            //     cc.log("jsroads:---@-:"+JSON.stringify("BOSS_DIE"));
            // }else if(FightData.PLAYER_DIE){
            //     cc.log("jsroads:---@-:"+JSON.stringify("PLAYER_DIE"));
            //     cc.log("jsroads:---@-:"+FightData.PLAYER_DIE);
            //     FightToast.lose();
            // }else{
            this.restData();
            Library.locked = false;
            this.setMaskLayerVisible(false);
            // }
            return;
        }
        if(Library.pathList.length>1&&!Library.dispearList.length){
            cc.log("jsroads:----:"+JSON.stringify("just boss hurt me "));
            cc.log("jsroads:----   :roundList"+JSON.stringify(FightData.roundList));
            this.fight();
            this.restData();
            return;
        }
        Library.all_map= DataConver.checkBalls(Library.map);
        DataConver.checkPlayerCombat(Library.dispearList);
        // 兵马未动，粮草先行，数据先做处理，然后再做动画展示
        // 算出小球消失后需要移动的 对象 其中 ball.diff 为小球移动的行数
        for(var g=0;g<Library.dispearList.length;g++){
            for(var q=0;q<Library.dispearList[g].length;q++){
                for(var u_line=0;u_line<Library.map.length;u_line++){
                    for(var u_row=0;u_row<Library.map[u_line].length;u_row++){
                        if(Library.map[u_line][u_row]==Library.dispearList[g][q]){
                            for(var move_balls=u_line+1;move_balls<Library.LINE_SIZE;move_balls++){
                                Library.dispearList[g][q].diff=0;  //要消失的显示对象 回归到 0 便于删除
                                Library.map[move_balls][u_row].diff++;
                                //cc.log("cc jsroads:------------: "+JSON.stringify("line:"+move_balls+"row:"+u_row+"--"+Library.map[move_balls][u_row].diff));
                            }
                        }
                    }
                }
            }
        }

        this.oneGroupDispear(Library.dispearList);//糖果消除就开始
    },
    oneGroupDispear:function(group){
        this.candysDispear(group.shift());
        AudioContror.onButtonEffect(res.mm_wrap);
    },
    candysDispear:function(group){
        var groupNumber = group.length;
        for (var i = 0; i < group.length;i++){
            groupNumber--;
            var disCandy = group[i];
            var action = cc.sequence(
                cc.fadeOut(.20),
                cc.callFunc(this.dispearCallBack.bind(this),this,[disCandy,groupNumber]));
            if(disCandy){
                disCandy.runAction(action);
            }
        }

    },
    dispearCallBack:function(nodeExecutingAction,list){
        if(list[0]){
            list[0].release();
            list[0].stopAllActions();
            list[0].removeFromParent(true);
            list[0] = null;
        }
        if(list[1] ==0){
            if(Library.dispearList.length){
                this.oneGroupDispear(Library.dispearList);
            }else{
                this.moveRemains();//全部消失动画OK 上面的小球开始下落
                cc.log("jsroads:----moveRemains:roundList"+JSON.stringify(FightData.roundList));
                this.fight();
            }
        }
    },
    resetCheck:function(){
        this.intcheck();
    },
    moveRemains:function(){
        for(var line=0;line<Library.map.length;line++) {
            for (var row = 0; row < Library.map[line].length; row++) {
                if(Library.map[line][row].diff>0){
                    var time = Library.map[line][row].diff>5?0.45:(Library.map[line][row].diff>3?0.35:0.25);
                    var action = cc.sequence(
                        cc.moveTo(time,cc.p(Library.map[line][row].x
                            ,Math.round(Library.map[line][row].y - Library.map[line][row].diff*Library.GRID_SIZE))),
                        cc.callFunc(this.moveCallBack.bind(this),this,Library.map[line][row])
                    );
                    if(Library.map[line][row])Library.map[line][row].runAction(action);
                }
            }
        }
        //模拟 造出新的小球
        var map=this.creatMap();
        var line_len=Library.map.length;
        for(var _line = 0;_line<line_len;_line++){
            var row_len=Library.map[_line].length;
            for(var _row=0;_row<row_len;_row++){
                var diff=Library.map[_line][_row].diff;
                if(diff>0){
                    Library.map[_line-diff][_row]=Library.map[_line][_row];
                    var temp = {};
                    temp.line = Library.map[_line-diff][_row].line - diff;
                    temp.row = Library.map[_line-diff][_row].row;
                    temp.candyName="candy"+temp.line+"_"+temp.row;
                    temp.rect={x:Library.map[_line-diff][_row].x-Library.GRID_SIZE/2,
                        y:Math.round(Library.map[_line-diff][_row].y - diff*Library.GRID_SIZE-Library.GRID_SIZE/2)};
                    Library.map[_line-diff][_row].diff = 0;
                    DataConver.cloneCandyInfo(Library.map[_line-diff][_row],temp);
                }
            }
        }
        var rowArray= this.getRowNumber(Library.all_map);
        for(var c=0;c<rowArray.length;c++){
            if(rowArray[c]>0){
                for(var __line= 10-rowArray[c];__line<Library.LINE_SIZE;__line++){
                    Library.map[__line][c] = map[__line][c];
                    if(Library.map[__line][c].getParent() == null ){
                        this.container.addChild(Library.map[__line][c]);
                    }
                }
            }
        }
        this.restData();
    },
    restData:function () {
        Toast.playEffect(Library.all_map);//根据消除的总个数，播放不同的效果
        Library.curCandy = null;//当前被操作的对象
        Library.moveCandy = null;//漂浮起来的对象
        Library.tempInfo = {};//临时信息存储
        Library.curPoint= cc.p(0,0);//当前位置坐标
        Library.hitPoint= cc.p(0,0);//目标交换位置坐标
        Library.pathList = []; //小球经过的路径 前端和服务器验证路径是否可行（防止外挂）
        Library.dispearList = [];//消失的小球的数组 二维数组 其中 每个子对象为一个连击
        this.resetSchedule();
        Library.all_map = [];//散乱的消失的显示对象的数组
    },
    fight:function () {
        var round = FightData.roundList.shift();
        cc.log("jsroads:----   :round"+JSON.stringify(round));
        if(round){
            FightController.play(round,this.fight.bind(this));
            cc.log("jsroads:---@-fight:");
        }else {
            if(FightData.BOSS_DIE){
                FightToast.win();
                cc.log("jsroads:---@-:"+JSON.stringify("BOSS_DIE"));
            }else if(FightData.PLAYER_DIE){
                cc.log("jsroads:---@-:"+JSON.stringify("PLAYER_DIE"));
                cc.log("jsroads:---@-:"+FightData.PLAYER_DIE);
                FightToast.lose();
            }else{
                // this.restData();
                // this.setMaskLayerVisible(false);
                // Library.locked = false;
                cc.log("jsroads:---@-end:");
                this.resetCheck();
                // this.scheduleOnce(this.resetCheck.bind(this),.25);
            }
        }
    },
    //小球移动结束 结束 动画（貌似本身已经结束了，对引擎核心处理不了解，故做了这个，了解的可以修改）
    moveCallBack:function(nodeExecutingAction,target){
        target.stopAllActions();
    },
    /**
     *  此时自己随机生成新的显示对象的最新列表
     *  * @returns {Array}
     */
    creatMap:function(){
        var map=[];
        var candy;//声明一个显示对象
        for(var line=0;line<Library.LINE_SIZE;line++){
            map[line]=[];
            for(var row=0;row<Library.ROW_SIZE;row++){
                var colorIndex= parseInt(Math.random()*Library.CANDY_COLOR_LIST.length);
                var newColorArray=Library.CANDY_COLOR_LIST;
                candy= new Candy(newColorArray[colorIndex],line,row);
                candy.x=Library.MAP_X+row*Library.GRID_SIZE;
                candy.y=Library.MAP_Y+line*Library.GRID_SIZE;
                map[line][row]=candy;
            }
        }
        return map;
    },
    getRowNumber: function (arr_){
        var rowArray=[];
        for(var num=0;num<Library.ROW_SIZE;num++){
            var n = 0;
            rowArray.push(n);
            for (var i = 0; i < arr_.length; i++) {
                var candy = arr_[i];
                if(candy.row==num){
                    rowArray[num]++;
                }
            }
        }
        return rowArray;
    },
    pushPath:function(candy){
        //创建一个小球移动的轨迹 这个服务器端需要 避免外挂
        //本地版这个可以不做，如果联网版本，这个路径需要
        // 在每次操作结束的时候 把路径 Library.pathList
        // 发给 发给服务器验证路径的可操作性
        var path={line:candy.line,row:candy.row};
        Library.pathList.push(path);
    },
    setSchedule:function(){
        cc.log("jsroads:----:setSchedule"+JSON.stringify("setSchedule"));
        if(!this.myUpdate){
            cc.log("jsroads:----:myUpdate"+JSON.stringify("myUpdate"));
            this.myUpdate = this.update.bind(this);
        }

        this.schedule(this.myUpdate,1,cc.REPEAT_FOREVER);
    },
    resetSchedule:function(){
        cc.log("jsroads:----:"+JSON.stringify("resetSchedule"));
        this.unschedule(this.myUpdate);
        Library.time = 0;
    },
    update:function(dt){
        Library.time = Math.round(Library.time+dt);
        // cc.log("Timer  is  dt：",dt);
        // cc.log("Timer  is ：",Library.time);
        var time =Math.round(Library.PLAY_TIME-Library.time);
        cc.log("cc jsroads:------------time: "+JSON.stringify(dt));
        if(time== 3){
            cc.log("cc jsroads:------------: "+JSON.stringify("剩余最后三秒出现倒计时"));
            CandyProcessMc.initProcess(Library.moveCandy,time);
        }
        if(time <= 0){
            cc.log("每7秒显示一次");
            this.finishWork();
        }
    },
    resetGame:function (isWin) {
        this.restData();
        this.container.removeAllChildren(true);
        FightData.PLAYER_DIE =false;//玩家是否已经输掉
        FightData.BOSS_DIE =false;//Boss 是否已经死亡
        cc.log("jsroads:----isWin:"+JSON.stringify(isWin));
        //如果胜利了 关卡++
        if(isWin){
            FightData.PLAY_LEVEL ++;
        }
        FightData.playerCurHp = FightData.getPlayerHP();
        FightData.bossCurHP = FightData.getBossHP();
        this.initCandyList();
        this.readyNumber = 2;//这个是初始化 动画元素的数量 目前只有 主角和一个boss  故写了2 如果是游戏 应该取map的length

        cc.log("jsroads:----:"+JSON.stringify(" come here"));
        PlayerHp.backHp(this,FightData.playerCurHp,FightData.playerMaxHp,this.readyPlay.bind(this));
        cc.log("jsroads:----:"+JSON.stringify(" come !!here"));
        Boss.backHp(this,FightData.bossCurHP,FightData.bossMaxHP,this.readyPlay.bind(this));
        Boss.setBossStyle();
        this.levLabel.setString(FightData.PLAY_LEVEL);
    },
    readyPlay:function () {
        this.readyNumber--;
        cc.log("jsroads:----this.readyNumber:"+JSON.stringify(this.readyNumber));
        if(this.readyNumber)return;
        this.setMaskLayerVisible(false);
        Library.locked = false;
        cc.log("jsroads:----Library.locked:"+JSON.stringify(Library.locked));
    },
    onExit:function () {
        this._super();
        this.restData();
    }
});

//for(var line=0;line<Library.LINE_SIZE;line++) {
//    for (var row = 0; row < Library.ROW_SIZE; row++) {
//        //cc.log("cc jsroads:------------candyName : "+JSON.stringify(Library.map[line][row].candyName));
//        //if(Library.map[line][row].line != line){
//        //    cc.log("cc jsroads:------------@line : "+JSON.stringify(line));
//        //    cc.log("cc jsroads:------------------map_line : "+JSON.stringify(Library.map[line][row].line));
//        //}
//        //if(Library.map[line][row].row!= row){
//        //    cc.log("cc jsroads:------------@row : "+JSON.stringify(row));
//        //    cc.log("cc jsroads:------------!row : "+JSON.stringify(Library.map[line][row].row));
//        //}
//        //cc.log("cc jsroads:------------rect: "+JSON.stringify(Library.map[line][row].rect));
//    }
//}
