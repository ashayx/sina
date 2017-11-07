class PageFour extends Dragon {
    init() {
        let bg = this.createBitmap('whitebg')
        bg.width = W
        bg.height = H
        this.addChild(bg)

        let title = this.createBitmap('p4.top', true)
        title.x = W * .5
        title.y = H * .1
        this.addChild(title)

        egret.Tween.get(title, { loop: true })
            .to({ scaleX: 1.2, scaleY: 1.2 }, 1000)
            .to({ scaleX: 1, scaleY: 1 }, 1000)


        let box1 = this.createBox('man1', 'p4.q1', 'p4.a1')
        box1.y = H * .25
        this.addChild(box1)


        egret.setTimeout(() => {
            let box2 = this.createBox('man2', 'p4.q2', 'p4.a2')
            box2.y = H * .65
            this.addChild(box2)
        }, this, 3000)

        // bg.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.changePage(new PageFive)
        }, this)

    }
}