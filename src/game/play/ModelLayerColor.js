/**
 * Created by jsroads on 2016/8/13.18:40
 * Note: 不能交互层
 */
"use strict";
cc.ModelLayerColor = cc.LayerColor.extend({
    m_touchListener:null,
    ctor:function(opacity){
        this._super();
        this.setOpacity(opacity);
        var touchListener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        };
        cc.eventManager.addListener(touchListener, this);
        this.m_touchListener = touchListener;
    },
    onTouchBegan:function(touch, event) {
        var target = event.getCurrentTarget();
        if(!target.isVisible() || (!function (target,touch) {
                if(!target || !target.getParent()){
                    return false;
                }
                var touchLocation = touch.getLocation(); // Get the touch position
                touchLocation = target.getParent().convertToNodeSpace(touchLocation);
                return cc.rectContainsPoint(target.getBoundingBox(), touchLocation);
            })){
            return false;
        }
        return true;
    },
    isTouchInside: function (owner,touch) {
        if(!owner || !owner.getParent()){
            return false;
        }
        var touchLocation = touch.getLocation(); // Get the touch position
        touchLocation = owner.getParent().convertToNodeSpace(touchLocation);
        return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation);
    }
});