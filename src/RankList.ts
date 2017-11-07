class RankList extends Page {

    public score
    public data
    public whoID
    public constructor(score,whoID) {
        super();
        this.score = score
        this.whoID = whoID
    }
    init() {
        $.ajax({
            url: 'http://h5.sjzzimu.com/sinaAnswer/ShowList/queryShowListInfoUseOpenidShare.do',
            type: 'post',
            dataType: 'json',
            data: {
                openidshare: this.whoID
            },
            success: (data) => {
                console.log(data);
                
                this.data = data
                // alert(this.whoID+'的排行榜')
                // alert('查询' + data.showList.length)
                this.star()
                
            }
        })
    }
    star() {
        let back = this.createBitmap('rank.bg')
        back.width = W
        back.height = H
        this.addChild(back)
        
        let bg = this.createBitmap("userb_json.userbg");
        bg.width = W;
        bg.height = H;
        this.addChild(bg)

        let jusebox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
        jusebox.width = 439 * W / 640;
        jusebox.height = H * 226 / 1009;
        jusebox.x = W * 100 / 640;
        jusebox.y = H * 134 / 1009;
        this.addChild(jusebox);

        let juse = this.createBitmap("paihang_json.juse");
        jusebox.addChild(juse);
        let dingzhi = this.createBitmap("paihang_json.dingzhi", true);
        dingzhi.x = W * .5;
        dingzhi.y = H * 387 / 1009;
        this.addChild(dingzhi);

        let dianwo = this.createBtn("paihang_json.dianwo", () => {
            this.changePage(new WelcomePage)
        });
        dianwo.x = W * .5;
        dianwo.y = H * 463 / 1009;
        this.addChild(dianwo);

        let youbk = this.createBitmap("youbk_png", true);
        youbk.width = W * .92;
        youbk.x = W * .51;
        youbk.y = H * 600 / 1009;
        this.addChild(youbk);

        let circle = this.createBitmap("paihang_json.touxiang");
        circle.x = youbk.x - youbk.width /2 +44;
        circle.y = youbk.y - circle.height / 2
        this.addChild(circle);

       

        let nickname: egret.TextField = new egret.TextField;
        nickname.text = name;
        nickname.size = 30;
        nickname.textColor = 0x000000;
        nickname.x = 139 + youbk.x - youbk.width / 2;
        nickname.y = youbk.y - 15
        nickname.text = myNickname;
        this.addChild(nickname);

        let moqi = this.createBitmap("paihang_json.moqi");
        moqi.width = 78 + 20;
        moqi.height = 18 + 20 * 18 / 79;
        moqi.x = 360 + youbk.x - youbk.width / 2;
        moqi.y = youbk.y - moqi.height / 2;
        this.addChild(moqi);

        let score: egret.BitmapText = new egret.BitmapText;
        score.font = RES.getRes('font1');
        let baifenbi = Math.floor(this.score / 8 * 100)
        score.text = `${baifenbi}%`;
        score.letterSpacing = -6;
        score.x = 458 + youbk.x - youbk.width / 2;
        score.y = youbk.y - 25;
        this.addChild(score);

        let bigbox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
        bigbox.width = W;
        let creatjuse: Function = (ti) => {
            let baifenbi = Math.floor(ti / 8 * 100)
            let text1: egret.BitmapText = new egret.BitmapText;
            text1.font = RES.getRes('font');
            text1.text = `你答对了${ti}道题`;

            text1.x = 89;
            text1.y = 30;
            text1.letterSpacing = -6;
            let text2: egret.BitmapText = new egret.BitmapText;
            text2.font = RES.getRes('font1');
            text2.text = `读懂了TA${baifenbi}%的心`;
            text2.x = 30;
            text2.y = 93;
            text2.letterSpacing = -6;

            jusebox.addChild(text1);
            jusebox.addChild(text2);

        };
        creatjuse(this.score)

        let creatbox: Function = (diji, touxiang, name, baifenbi, datalength) => {
            let userInfoBox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
            userInfoBox.width = 582;
            userInfoBox.height = 117;
            bigbox.height = 117 * datalength;
            userInfoBox.x = 33;
            userInfoBox.y = diji * 117;

            let userbg = this.createBitmap("wubk_png");
            userbg.width = 582;
            userbg.height = 117;
            userInfoBox.addChild(userbg);
        
            let circle = this.createBitmap("paihang_json.touxiang");
            circle.x = 44;
            circle.y = 28;
            userInfoBox.addChild(circle);

            if (diji == 0) {
                let diyi = this.createBitmap("paihang_json.diyi");
                diyi.x = 1;
                diyi.y = 23;
                userInfoBox.addChild(diyi);
            }
            if (diji == 1) {
                let dier = this.createBitmap("paihang_json.dier");
                dier.x = 1;
                dier.y = 23;
                userInfoBox.addChild(dier);
            }
            if (diji == 2) {
                let disan = this.createBitmap("paihang_json.disan");
                disan.x = 1;
                disan.y = 23;
                userInfoBox.addChild(disan);
            }


            RES.getResByUrl(touxiang, (t: egret.Texture) => {
                let headImg: egret.Bitmap = new egret.Bitmap;
                headImg.texture = t;
                headImg.x = 44;
                headImg.y = 28;
                headImg.scaleX = headImg.scaleY = circle.width / headImg.width 
        
                userInfoBox.addChild(headImg);
                headImg.mask = circle;
            }, this, RES.ResourceItem.TYPE_IMAGE);

            let nickname: egret.TextField = new egret.TextField;
            nickname.text = name;
            nickname.size = 30;
            nickname.textColor = 0x000000;
            nickname.x = 139;
            nickname.y = 44;
            userInfoBox.addChild(nickname);

            let moqi = this.createBitmap("paihang_json.moqi");
            moqi.width = 78 + 20;
            moqi.height = 18 + 20 * 18 / 79;
            moqi.x = 360;
            moqi.y = 52;
            userInfoBox.addChild(moqi);

            let score: egret.BitmapText = new egret.BitmapText;
            score.font = RES.getRes('font1');
        
            score.text = `${baifenbi}%`;
            score.letterSpacing = -6;

            score.x = 458;
            score.y = 40;
            userInfoBox.addChild(score);
            bigbox.addChild(userInfoBox);
        };
        // myHeadimgurl = 'http://h5.sjzzimu.com/weixinUpload/upload/59ec372f-3ec0-4698-acdd-f7957ceeaf7e.png'
        RES.getResByUrl(myHeadimgurl, (t: egret.Texture) => {
            let headImg: egret.Bitmap = new egret.Bitmap;
            headImg.texture = t;
            headImg.x = circle.x;
            headImg.y = circle.y
            headImg.scaleX = headImg.scaleY = circle.width / headImg.width

            this.addChild(headImg);
            headImg.mask = circle;

        }, this, RES.ResourceItem.TYPE_IMAGE);
        for (let i: number = 0; i < this.data.showList.length; i++) {
            let o = this.data.showList[i]
            let baifenbi = Math.floor(o.questionnum / 8 * 100)
            // alert(o.headimgurl)
            creatbox(i, o.headimgurl, o.nickname, baifenbi, this.data.showList.length);
            // creatbox(i, 'http://h5.sjzzimu.com/weixinUpload/upload/59ec372f-3ec0-4698-acdd-f7957ceeaf7e.png', o.nickname, baifenbi, this.data.showList.length);

        }

        let myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(bigbox);
        myscrollView.anchorOffsetX = 0;
        myscrollView.anchorOffsetY = 0;
        myscrollView.width = W;
        myscrollView.height = H * 334 / 1009;
        myscrollView.x = 0;
        myscrollView.y = H * 640 / 1009;

        this.addChild(myscrollView);

    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

   /*  private shunxu(diji, touxiang, name, baifenbi): egret.DisplayObjectContainer {
        let userInfoBox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
        userInfoBox.width = 554;
        userInfoBox.height = 118;

        RES.getResByUrl(touxiang, (t: egret.Texture) => {
            let headImg: egret.Bitmap = new egret.Bitmap;
            headImg.texture = t;
            headImg.x = 91;
            headImg.y = 37;

            userInfoBox.addChild(headImg);
        }, this, RES.ResourceItem.TYPE_IMAGE);

        let nickname: egret.TextField = new egret.TextField;
        nickname.text = name;

        if (diji == 0) {
            let diyi = this.createBitmap("paihang_json.diyi");
        }

        return userInfoBox;

    } */
}
