/**
 *  by jsroads
 *
 * e-mail:jsroads@163.com
 */
cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.spriteFrameCache.addSpriteFrames(res.game_system_s_plist);
        cc.director.runScene(new WelcomeScene());
        // cc.director.runScene(new cc.TransitionFade(GC.TRANSITI_TIME,new GamePlayScene()));//进入操作场景
        cc.director.runScene(new cc.TransitionFade(GC.TRANSITI_TIME,new WelcomeScene()));//进入操作场景
    }, this);
};
cc.game.run();