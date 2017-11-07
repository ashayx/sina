class PageStart extends Page {

    init() {
        let bg = this.createBitmap('p6.bg')
        bg.width = W
        bg.height = H
        this.addChild(bg)

        let q = this.createBitmap('p6.q')
        q.x = W * .12
        q.y = H * .08
        this.addChild(q)

        // egret.Tween.get(q, { loop: true })
        //     .to({ scaleX: 1.2, scaleY: 1.2 }, 1000)
        //     .to({ scaleX: 1, scaleY: 1 }, 1000)

        let q1 = this.createBitmap('p6.q1',true)
        q1.x = W * .5 - 50
        q1.y = H * .18
        q1.alpha = 0
        this.addChild(q1)

        egret.Tween.get(q1)
            .wait(1000)
            .to({ alpha: 1}, 1000)
       
        let q2 = this.createBitmap('p6.q2', true)
        q2.x = W * .5 + 50
        q2.y = H * .23 + 20
        q2.alpha = 0
        this.addChild(q2)

        egret.Tween.get(q2)
            .wait(1500)
            .to({ alpha: 1 }, 1000)

        let a = this.createBitmap('p6.a')
        a.x = W * .85 - a.width
        a.y = H * .35
        a.alpha = 0
        this.addChild(a)

        egret.Tween.get(a)
            .wait(2000)
            .to({ alpha: 1 }, 1000)
            .call(()=>{
                // egret.Tween.get(a,{loop: true})
                //     .to({ scaleX: 1.2, scaleY: 1.2 }, 1000)
                //     .to({ scaleX: 1, scaleY: 1 }, 1000)
            })
            

        let answerMsg = this.createBitmap('p6.a1',true)
        answerMsg.alpha = 0
        answerMsg.x = W * .5
        answerMsg.y = H * .43 + answerMsg.height / 2
        this.addChild(answerMsg)

        egret.Tween.get(answerMsg)
            .wait(2500)
            .to({ alpha: 1 }, 1000)

        let btn = this.createBtn('p6.btn',()=>{
            btn.touchEnabled = true
            this.changePage(new PageQuestion)
        })
        btn.x = W * .5
        btn.y = H * .9

        this.addChild(btn)

        egret.Tween.get(btn)
            .to({ scaleX: 0, scaleY: 0, alpha: 0 }, 0)
            .wait(3000)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800, egret.Ease.backInOut)


    }
}