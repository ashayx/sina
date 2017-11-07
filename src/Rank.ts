class Rank extends Page {
    init() {
        let bg = this.createBitmap('rank.bg')
        bg.width = W
        bg.height = H
        this.addChild(bg)

        let msg = new egret.Sprite
        let msgbg = this.createBitmap('rank.msg')

        msg.width = msgbg.width
        msg.height = msgbg.height
        msg.x = W * .5 - msg.width / 2
        msg.y = H * .1

        let text1 = new egret.BitmapText()
        text1.font = RES.getRes('font')

        text1.x = 100
        text1.y = 50
        text1.text = '你答对了5道题'
        text1.textAlign = "center"

        let text2 = new egret.BitmapText()
        text2.font = RES.getRes('font1')

        text2.x = 40
        text2.y = 120
        text2.text = '读懂了TA95%的心'
        // text2.letterSpacing  = -10
        text2.textAlign = "center"


        msg.addChild(msgbg)
        msg.addChild(text1)
        msg.addChild(text2)
        this.addChild(msg)

        let title = this.createBitmap('rank.title', true)
        title.x = W * .5
        title.y = H * .4
        this.addChild(title)

        let btn = this.createBtn('rank.btn', () => {
            btn.touchEnabled = true
            this.changePage(new WelcomePage())

        })
        btn.x = W * .5
        btn.y = H * .5
        this.addChild(btn)
        egret.Tween.get(btn)
            .to({ scaleX: 0, scaleY: 0, alpha: 0 }, 0)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800, egret.Ease.backInOut)

        let box = this.createBox()
        this.addChild(box)

      
    }
    /**
     *  createBox
     */
    public  createBox(): egret.Sprite {
        let box = new egret.Sprite
        let bg = this.createBitmap('rank.box',true)
        box.addChild(bg)
        bg.scaleX = 1.05
        box.width = bg.width
        box.height = bg.height
        box.x = W * .5
        box.y = H * .6

        RES.getResByUrl('https://avatars0.githubusercontent.com/u/26337920?s=460&v=4', (event: any)=>{
            let img: egret.Texture = <egret.Texture>event;
            let photo: egret.Bitmap = new egret.Bitmap(img);
            box.addChild(bg)
        }, this, RES.ResourceItem.TYPE_IMAGE);

        
        return box
        
    }
}