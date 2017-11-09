var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var _this = this;
        log = console.log.bind(console);
        W = this.stage.stageWidth;
        H = this.stage.stageHeight;
        // 获取res.json中的数据
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './resource/default.res.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                _this.onConfigComplete(data);
            }
        };
        xhr.send(null);
        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (data) {
        // 创建res.json
        var createResDataJson = (function () {
            var resData = {
                "groups": [
                    {
                        "keys": "",
                        "name": "preload"
                    }
                ],
                "resources": []
            };
            resData.resources = data.resources;
            for (var i in resData.resources) {
                resData.groups[0].keys += resData.resources[i].name + ",";
            }
            return resData;
        })();
        RES.parseConfig(createResDataJson, './resource/');
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        // RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        // 是否为分享链接
        if (isShareLink) {
            //是否为本人进
            if (openidshare == openidUser) {
                // alert('本人进入')
                // this.addChild(new RankList(6,openidUser))
                this.addChild(new WelcomePage());
                var param = "?openid=" + openidUser + "&id=" + shareId;
                wx.onMenuShareTimeline({
                    title: '我出了一份符合我气质的试卷，谁能读懂我？',
                    link: 'http://h1v.cn/WxCom/p/SINAJST.do' + param,
                    success: function () {
                    },
                    cancel: function () {
                    }
                });
                wx.onMenuShareAppMessage({
                    title: '我出了一份符合我气质的试卷，谁能读懂我？',
                    desc: '谁能读懂我内心跳动的戏，谁能猜透我内心深处的魂',
                    link: 'http://h1v.cn/WxCom/p/SINAJST.do' + param,
                    success: function () {
                    },
                    cancel: function () {
                    }
                });
            }
            else {
                // alert('其他人进入')
                // 是否回答过
                if (CODE) {
                    console.log('回答过', openidshare);
                    this.addChild(new RankList(answerObj.score, openidshare));
                }
                else {
                    // 是否为最新题 改了
                    // if (CODE) {
                    //     this.addChild(new PageAnswer())
                    // } else {
                    //     // 不是最新到排行榜
                    //     // this.addChild(new WelcomePage())
                    //     this.addChild(new RankList(0, openidshare))
                    // }
                    // 没答过
                    this.addChild(new StartAnswer());
                    // this.addChild(new PageAnswer())
                }
            }
        }
        else {
            this.addChild(new WelcomePage());
        }
        // this.addChild(new WelcomePage())
        // this.addChild(new PageTwo())
        // this.addChild(new PageThree())
        // this.addChild(new PageFour())
        // this.addChild(new PageQuestion())
        // this.addChild(new PageAnswer())
        // this.addChild(new RankList(6))
        // this.addChild(new StartAnswer())
        // this.addChild(new PageEnd())
        // this.addChild(new paihang())
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
