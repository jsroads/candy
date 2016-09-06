/**
 * Created by jsroads on 2016/8/24.10:10
 * Note: 蒙板 对象
 */
"use strict";
var ClipSp = ClipSp||{};
ClipSp.gameClip = null;
ClipSp.clipNode = function (node) {
    if(!Toast.gameClip ){
        ClipSp.gameClip = new GameClip();
        ClipSp.gameClip.clipNode(node);
    }else{
        ClipSp.gameClip.clipNode(node);
    }
};
var GameClip = cc.Class.extend({
    clipNode:function (node) {
        var clipnode = this.cliper("#game_mask.png");
        clipnode.attr({
            x:0,
            y:0
        });
        node.addChild(clipnode);
        clipnode.addChild(node.container);
    },
    /**
     * 创建蒙版
     * @param frameName
     * @returns {cc.ClippingNode}
     */
    cliper:function (frameName) {
        //创建一个遮罩的模板
        var sten = new cc.Sprite(frameName);
        sten.attr({
            anchorX:0,
            anchorY:0
        });
        //创建一个ClippingNode 并设置一些基础属性 容器宽高与模板有关
        var clipnode = new cc.ClippingNode();
        clipnode.attr({
            stencil:sten,

            anchorX:0.5,

            anchorY:0.5,

            alphaThreshold:0.8,//设置裁剪透明值阀值 默认值为1 等于1時 alpha = 0的部分也被裁剪

        });
        return clipnode;
    }
});