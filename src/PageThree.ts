class PageThree extends Dragon {
    init() {
        let bg = this.createBitmap('whitebg')
        bg.width = W
        bg.height = H
        this.addChild(bg)

        let title = this.createBitmap('p3.top',true)
        title.x = W * .5
        title.y = H * .1
        this.addChild(title)

        egret.Tween.get(title,{loop: true})
            .to({ scaleX: 1.2,scaleY: 1.2},1000)
            .to({ scaleX: 1, scaleY: 1},1000)
        

        let box1 = this.createBox('woman1','p3.q1','p3.a1')
        box1.y = H * .25 
        this.addChild(box1)


        egret.setTimeout(() => {
            let box2 = this.createBox('woman2','p3.q2', 'p3.a2')
            box2.y = H * .65
            this.addChild(box2)
        }, this, 3000);

        // bg.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.changePage(new PageFour)
        }, this)

    }
    /**
     * createBox
     * womanName,龙骨动画名称
     * question，问题图片路径
     * answer，回答图片路径
     */
   /*  public createBox(womanName: string, question: string, answer: string):egret.Sprite {
        let box = new egret.Sprite

        let kuang = this.createBitmap('p3.box')
        kuang.alpha = 0

        box.width = kuang.width
        box.height = kuang.height
        box.x = W * .5 - box.width  / 2
        
        // 骨骼动画
        let dragonbonesData = RES.getRes(`${womanName}_ske.json`)
        let textureData = RES.getRes(`${womanName}_tex.json`)
        let texture = RES.getRes(`${womanName}_tex.png`)

        let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory
        egretFactory.parseDragonBonesData(dragonbonesData)
        egretFactory.parseTextureAtlasData(textureData, texture)

        let woman: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(womanName)
        woman.alpha = 0
        woman.x = woman.width /2 - 10
        woman.y = woman.height /2 + kuang.height/2 - woman.height/2 - 5

        
        let q = this.createBitmap(question,true)
        q.x = kuang.width * .5
        q.y = 0

        let a = this.createBitmap(answer)
        a.x = kuang.width / 2 + 10
        a.y = 98

        woman.alpha = q.alpha = a.alpha = 0

        box.addChild(kuang)
        box.addChild(woman)
        box.addChild(q)
        box.addChild(a)
        egret.Tween.get(kuang).to({ alpha: 1 }, 600).call(() => {
            egret.Tween.get(woman).to( {alpha: 1},600).call(()=>{
                woman.animation.play(womanName, 0)
                egret.Tween.get(q).to({ alpha: 1 }, 800).call(() => {
                    egret.Tween.get(a).to({ alpha: 1 }, 800).call(() => {

                    })
                })
            })
        })

        return box
        
    } */
}