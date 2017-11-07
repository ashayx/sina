class paihang extends Page {
    public score
    public constructor(score) {
        super();
        this.score = score
    }

    init() {
        $.ajax({
            url: 'http://h5.sjzzimu.com/sinaAnswer/ShowList/queryShowListInfoUseOpenidShare.do',
            type: 'post',
            dataType: 'json',
            data: {
                openidshare: openidshare
            },
            success: function (data) {
                console.log(data);
            
            }
        })
        
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
        jusebox.x = W * 85 / 640;
        jusebox.y = H * 134 / 1009;
        this.addChild(jusebox);
        let juse = this.createBitmap("paihang_json.juse");
        jusebox.addChild(juse);
        let dingzhi = this.createBitmap("paihang_json.dingzhi", true);
        dingzhi.x = W * .5;
        dingzhi.y = H * 387 / 1009;
        this.addChild(dingzhi);
        let dianwo = this.createBtn("paihang_json.dianwo",()=>{
            this.changePage(new WelcomePage)
        });
        dianwo.x = W * .5;
        dianwo.y = H * 463 / 1009;
        this.addChild(dianwo);
        let youbk = this.createBitmap("youbk_png", true);
        youbk.x = W * .51;
        youbk.y = H * 600 / 1009;
        this.addChild(youbk);
        let bigbox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
        bigbox.width = W;
        bigbox.height = H * 322 / 1009;
        bigbox.y = H * 652 / 1009;
        this.addChild(bigbox)
        let creatjuse: Function = (ti) => {
            let baifenbi = Math.floor(ti / 6 * 100)
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
        let creatbox: Function = (diji, touxiang, name, baifenbi) => {
            let userInfoBox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
            userInfoBox.width = 546;
            userInfoBox.height = 117;
            userInfoBox.x = 33;
            userInfoBox.y = diji * 117;
            let userbg = this.createBitmap("wubk_png");
            userInfoBox.addChild(userbg);
            let circle = this.createBitmap("paihang_json.touxiang");
            circle.x = 44;
            circle.y = 32;
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
                headImg.y = 32;

                userInfoBox.addChild(headImg);
                headImg.mask = circle;
            }, this, RES.ResourceItem.TYPE_IMAGE);

            let nickname: egret.TextField = new egret.TextField;
            nickname.text = name;
            nickname.size = 20;
            nickname.x = 139;
            nickname.y = 44;
            userInfoBox.addChild(nickname);
            let moqi = this.createBitmap("paihang_json.moqi");
            moqi.x = 360;
            moqi.y = 52;
            userInfoBox.addChild(moqi);
            var score: egret.TextField = new egret.TextField;
            score.text = baifenbi;
            score.size = 25;
            score.x = 458;
            score.y = 44;
            userInfoBox.addChild(score);
            bigbox.addChild(userInfoBox);
        };

        //   $.ajax(
        //       success:Function(data){
        //           for(var i = 0; i<data.length;i++){
        //                 sadfasdf(D,SDAF,ADSF,ASDF);
        //           }
        //       }
        //   )

        //    egret.Tween.get(shou,{loop:true}).to({x:shou.x +30,y:shou.y-20},500).to({x:shou.x,y:shou.y},500);
        //    this.touchEnabled = true
        //     this.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        //         this.parent.addChild(new page9);
        //        this.parent.removeChild(this);

        //     },this)

    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private shunxu(diji, touxiang, name, baifenbi): egret.DisplayObjectContainer {
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

    }
}
