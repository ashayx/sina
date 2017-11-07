class PageFive extends Dragon {

    init() {
        let bg = this.createBitmap('whitebg')
        bg.width = W
        bg.height = H
        this.addChild(bg)

        let title = this.createBitmap('p5.top', true)
        title.x = W * .5
        title.y = H * .1
        this.addChild(title)

        egret.Tween.get(title, { loop: true })
            .to({ scaleX: 1.2, scaleY: 1.2 }, 1000)
            .to({ scaleX: 1, scaleY: 1 }, 1000)


        let box1 = this.createBox('man3', 'p5.q1', 'p5.a1')
        box1.y = H * .25
        this.addChild(box1)


        egret.setTimeout(() => {
            let box2 = this.createBox('man4', 'p5.q2', 'p5.a2')
            box2.y = H * .65
            this.addChild(box2)
        }, this, 3000)

        // bg.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.changePage(new PageStart())
        }, this)

    }
}