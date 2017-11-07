class PageEnd extends Page {
    init() {
        let bg = this.createBitmap('p6.bg')
        bg.width = W
        bg.height = H
        

        let photo = this.createBitmap('question.photo_1', true)
        photo.x = W * .5
        photo.y = H * .15

        let title = this.createBitmap('end.tip', true)
        title.x = W * .5
        title.y = H * .3
        

        let btn = this.createBtn('end.btn', () => {
            btn.touchEnabled = true
            sharebg.touchEnabled = true
            sharebg.alpha = 1
        })
        btn.x = W * .5
        btn.y = H * .6

        let arrow = this.createBitmap('arrow', true)
        arrow.x = W * .5
        arrow.y = H * .9
        arrow.scaleX = arrow.scaleY = .4

        egret.Tween.get(arrow,{ loop: true })
            .to({ y: H * .9 + 30},1000)

        let sharebg = this.createBitmap('end.share')
        sharebg.width = W
        sharebg.height = H
        sharebg.alpha = 0

        sharebg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            sharebg.touchEnabled = false
            p9.touchEnabled = true
            p9.alpha = 1
            sharebg.alpha = 0

            for (let i = 1; i < 15; i++) {
                msg.alpha = 1
                egret.Tween.get(msg)
                    .wait(200 * (i- 1))
                    .call(() => {
                        msg.texture = RES.getRes(`p9.${i}`)
                    })
            }
        }, this)

        let p9 = this.createBitmap('whitebg')
        p9.width = W
        p9.height = H
        p9.alpha = 0
        
        let msg = this.createBitmap('whitebg')
        msg.width = W
        msg.height = H
        msg.alpha = 0

        p9.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            p9.touchEnabled = false
            p9.alpha = 0
            msg.alpha = 0
            msg.texture = RES.getRes('whitebg')
            egret.Tween.removeTweens(msg)
        }, this)

        this.addChild(bg)
        this.addChild(photo)
        this.addChild(title)
        this.addChild(btn)
        this.addChild(arrow)
        this.addChild(sharebg)
        this.addChild(p9)
        this.addChild(msg)

        let moveY = 0
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{
            // log('star',e.$stageY)
            moveY = e.$stageY
        },this)
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
            // log(e.$stageY)
        }, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
            // log('end',e.$stageY)
            if (e.$stageY < moveY ) {
                log('滑动')
                sharebg.touchEnabled = false
                p9.touchEnabled = true
                p9.alpha = 1
                sharebg.alpha = 0

                for (let i = 1; i < 15; i++) {
                    msg.alpha = 1
                    egret.Tween.get(msg)
                        .wait(200 * (i - 1))
                        .call(() => {
                            msg.texture = RES.getRes(`p9.${i}`)
                        })
                }
            }
        }, this)
       
    }
    public textField:egret.BitmapText
}