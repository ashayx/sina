class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        log = console.log.bind(console)
        W = this.stage.stageWidth;
        H = this.stage.stageHeight;
        // 获取res.json中的数据
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './resource/default.res.json', true)
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data: any = JSON.parse(xhr.responseText)
                this.onConfigComplete(data)
            }
        }
        xhr.send(null)


        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(data: any): void {

        // 创建res.json
        let createResDataJson = (() => {
            let resData: any = {
                "groups": [
                    {
                        "keys": "",
                        "name": "preload"
                    }
                ],
                "resources": []
            }

            resData.resources = data.resources

            for (var i in resData.resources) {
                resData.groups[0].keys += `${resData.resources[i].name},`
            }

            return resData
        })()

        RES.parseConfig(createResDataJson, './resource/')

        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI()
        this.stage.addChild(this.loadingView)


        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);


        // RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }



    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        // $.ajax({
        //     url: 'http://h5.sjzzimu.com/sinaAnswer/ShowList/queryAnswerIdUseOpenidShowAndAnswerId.do',
        //     type: 'post',
        //     dataType: 'json',
        //     data: {
        //         openidshow: openidUser,
        //         score: shareId
        //     },
        //     success: function (data) {
        //         CODE = data.code
        //         console.log('是否答过', data);


        //         //没回答过
        //         if (!CODE) {
        //             // getQuestionAndAnswer()
        //         }
        //     }
        // });
        // 是否为分享链接
        if (isShareLink) {
            //是否为本人进
            if (openidshare == openidUser) {
                // alert('本人进入')
                // this.addChild(new RankList(6,openidUser))
                this.addChild(new WelcomePage())
            } else {
                // alert('其他人进入')
                // 是否回答过
                if (CODE) {
                    console.log('回答过', openidshare)
                    this.addChild(new RankList(answerObj.score,openidshare))
                } else {
                    // 是否为最新题 改了
                    // if (CODE) {
                    //     this.addChild(new PageAnswer())
                    // } else {
                    //     // 不是最新到排行榜
                    //     // this.addChild(new WelcomePage())
                    //     this.addChild(new RankList(0, openidshare))
                    // }
                    // 没答过
                    this.addChild(new PageAnswer())
                }
            }
        }else {
            this.addChild(new WelcomePage())
        }
       
        // this.addChild(new WelcomePage())
        // this.addChild(new PageTwo())
        // this.addChild(new PageThree())
        // this.addChild(new PageFour())
        // this.addChild(new PageQuestion())
        // this.addChild(new PageAnswer())
        // this.addChild(new RankList(6))
        // this.addChild(new PageStart())
        // this.addChild(new PageEnd())
        // this.addChild(new paihang())
        
        
    }



}

declare let log: any
declare let W: number
declare let H: number
declare let CODE: number
declare let searchRankList: boolean
declare let answerObj: any

declare let openidshare: string
declare let openidUser: string
declare let shareId: string
declare let myNickname: string
declare let myHeadimgurl: string
declare let searchIsAnswer: Function

declare let isShareLink: boolean
declare let yundaoWx