class LoadingUI extends Page {

    init(): void {
        this.createView()
        RES.getResAsync('whitebg',()=>{
            RES.getResAsync('loading.tip', () => {
                RES.getResAsync('loading.load', () => {

                    let bg = this.createBitmap('whitebg')
                    bg.width = W
                    bg.height = H

                    let arm = this.createBitmap('loading.arm',true)
                    arm.x = W * .5
                    arm.y = H * .3

                    egret.Tween.get(arm, {loop: true})
                        .to( { y: H * .3 - 20}, 600, egret.Ease.cubicInOut )
                        .to({ y: H * .3  }, 600, egret.Ease.cubicInOut)

                    let dian = this.createBitmap('loading.dian', true)
                    dian.x = W * .5
                    dian.y = arm.y + arm.height / 2 + 30

                    egret.Tween.get(dian, { loop: true })
                        .to({ alpha: 0 }, 600, egret.Ease.cubicInOut)
                        .to({ alpha: 1 }, 600, egret.Ease.cubicInOut)

                    let load = this.createBitmap('loading.load',true)
                    load.x = W * .5
                    load.y = H * .5

                    let loaddian = this.createBitmap('loading.loaddian')
                    loaddian.x = load.x + load.width / 2 + 10
                    loaddian.y = H * .5

                    let square: egret.Shape = new egret.Shape()
                    square.graphics.beginFill(0x0000ff)
                    square.graphics.drawRect(loaddian.x - loaddian.width, loaddian.y, loaddian.width + 100, loaddian.height)
                    square.graphics.endFill()
                    
                    egret.Tween.get(square, { loop:true })
                        .to({ x: loaddian.x - loaddian.width - 100}, 1000 )
                        .to({ x: loaddian.x }, 1000)
                    loaddian.mask = square
                    
                    this.addChild(bg)
                    this.addChild(arm)
                    this.addChild(dian)
                    this.addChild(load)
                    this.addChild(square)
                    this.addChild(loaddian)
                    
                    RES.loadGroup("preload")
                }, this)
            }, this)
        },this)
    }
    private textField:egret.TextField

    private createView():void {
        this.textField = new egret.TextField()
        this.textField.width = this.width
        this.textField.height = 100
        this.textField.anchorOffsetX = this.textField.width / 2
        this.textField.anchorOffsetY = this.textField.height / 2
        this.textField.x = this.width * .5
        this.textField.textColor = 0x000000
        this.textField.textAlign = egret.HorizontalAlign.CENTER
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE
    }

    public setProgress(current:number, total:number):void {
        this.textField.text = (Math.floor(current / total * 100)) + "%"
    }
}
