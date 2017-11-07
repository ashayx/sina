class PageQuestion extends Question {
    private index: number = 0
    // private naquestionArray: Array<number>
    private questionNumber: egret.Bitmap
    private photo: egret.Bitmap
    init() {

        
        this.questionArray = this.createQuestion(8, 18)
        log(this.questionArray)
        this.selectArray = []

        let bg = this.createBitmap('question.bg')
        bg.width = W
        bg.height = H
        this.addChild(bg)

        this.photo = this.createBitmap(`question.photo_${this.index + 1}`, true)
        this.photo.x = W * .5
        this.photo.y = H * .15 - 30
        this.addChild(this.photo)

        this.questionNumber = this.createBitmap(`question.q${this.index + 1 }`, true)
        this.questionNumber.x = W * .5
        this.questionNumber.y = H * .28 - 30
        this.addChild(this.questionNumber)
       
        // 题目
        this.questionBox = new egret.Sprite()
        let questionBoxBg = this.createBitmap('question.qborder')

        this.questionBox.width = questionBoxBg.width
        this.questionBox.height = questionBoxBg.height
        this.questionBox.x = W * .5 - this.questionBox.width / 2
        this.questionBox.y = H * .33 - 20

        // this.questionBox.addChild(questionBoxBg) 
        this.addChild(this.questionBox)


        // 选项
        this.selectBox= new egret.Sprite()
        let sBoxBg = this.createBitmap('question.abg')

        this.selectBox.width = sBoxBg.width
        this.selectBox.height = sBoxBg.height
        this.selectBox.x = W * .5 - this.selectBox.width / 2
        this.selectBox.y = H * .4

        this.selectBox.addChild(sBoxBg)
        this.addChild(this.selectBox)

        // this.createSelectBox(1)
        this.createSelectBox(this.questionArray[this.index])

    }
    /**
    * itemAnimation
    * goIn : true 移入，false 移出
    */
    public itemAnimation(name: egret.Bitmap, time: number, goIn: boolean) {
        if (goIn) {
            egret.Tween.get(name)
                .to({ x: W, alpha: 0 }, 0)
                .wait(time)
                .to({ x: this.selectBox.width * .5, alpha: 1 }, 500, egret.Ease.backInOut)
        } else {
            egret.Tween.get(name)
                .wait(time)
                .to({ x: - W, alpha: 0 }, 500, egret.Ease.backInOut).call(() => {
                    this.selectBox.removeChild(name)
                })
        }

    }
    /**
     * questionAnimation
     */
    public questionAnimation(name: egret.Bitmap, goIn: boolean) {
        if (goIn) {
            egret.Tween.get(name)
                .to({ alpha: 1 }, 800, egret.Ease.backInOut)
        } else {
            egret.Tween.get(name)
                .to({ alpha: 0 }, 800, egret.Ease.backInOut).call(()=>{
                    this.questionBox.removeChild(name)
                })
        }
    }
    /**
     * createSelectBox : 题目
     */
    public questionBox: egret.Sprite 
    /**
     * createSelectBox : 选项
     */
    public selectBox: egret.Sprite
    public createSelectBox(selectNumber: number) {
        
        let nextQuestion = () =>{
            this.index ++
            if (this.index >= 8) {
                log(this.questionArray)
                log(this.selectArray)
                let questionArray = this.questionArray.toString()
                let selectArray = this.selectArray.toString()
                this.changePage(new PageEnd)
                // 发送数据
                $.ajax({
                    url: 'http://h5.sjzzimu.com/sinaAnswer/answer/addNewAnswerInfoReturnId.do',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        openid: openidUser,
                        question: questionArray,
                        answer: selectArray,
                    },
                    success: function (data) {
                        console.log(data);
                        console.log(data.id);	//返回的ID 需要拼进链接参数里
                        console.log(data.msg);

                        yundaoWx.share_title = "竟然真的有读心术，惊呆了个我了······";
                        yundaoWx.share_desc = "谁能读懂我内心跳动的吸，谁能猜透我内心深处的魂";

                        var param = `?openid=${openidUser}&id=${data.id}`
                        yundaoWx.share_link = "http://h5.sjzzimu.com/171105202512/index.html" + param;
                        
                        yundaoWx.share_imgUrl = "http://h5.sjzzimu.com/171105202512/resource/share.png";
                        yundaoWx.share();

                       
                    }
                })

            }
            // 头像
            this.photo.texture = RES.getRes(`question.photo_${this.index + 1 }`)
            // 题号
            this.questionNumber.texture = RES.getRes(`question.q${this.index + 1}`)
            // 题目动画和选择动画
            this.questionAnimation(q, false)
            this.itemAnimation(s1, 0, false)
            this.itemAnimation(s2, 300, false)
            this.itemAnimation(s3, 600, false)
            if(s4) {

                this.itemAnimation(s4, 900, false)
            }

            egret.setTimeout(() => {
                // this.createSelectBox(8)
                this.createSelectBox(this.questionArray[this.index])
            }, this, 1000)
        }
        // 问题
        let q = this.createBitmap(`q${selectNumber}.q`, true)
        q.x = this.questionBox.width * .5
        q.y = this.questionBox.height * .5
        q.alpha = 0


        let s1 = this.createBtn(`q${selectNumber}.a_1`, ()=>{
            s1.texture = RES.getRes(`q${selectNumber}.s_1`)
            this.selectArray.push(0)
            nextQuestion()
        })

        let s2 = this.createBtn(`q${selectNumber}.a_2`, () => {
            s2.texture = RES.getRes(`q${selectNumber}.s_2`)
            this.selectArray.push(1)
            nextQuestion()

        })

        let s3 = this.createBtn(`q${selectNumber}.a_3`, () => {
            s3.texture = RES.getRes(`q${selectNumber}.s_3`)
            this.selectArray.push(2)
            nextQuestion()
        })
        let s4 = null
        
        s1.x = s2.x = s3.x =  W
        s1.alpha = s2.alpha = s3.alpha = 0
        s1.y = s1.height / 2 + 45
        s2.y = s1.y + s1.height
        s3.y = s2.y + s2.height

        

        this.questionBox.addChild(q)
        this.selectBox.addChild(s1)
        this.selectBox.addChild(s2)
        this.selectBox.addChild(s3)

        if (RES.getRes(`q${selectNumber}.a_4`)) {
            log('有第四个')
            s4 = this.createBtn(`q${selectNumber}.a_4`, () => {
                s4.texture = RES.getRes(`q${selectNumber}.s_4`)
                this.selectArray.push(3)
                nextQuestion()
            })
            s4.x = W
            s4.y = s3.y + s3.height
            this.selectBox.addChild(s4)
            this.itemAnimation(s4, 900, true)
        }

        this.questionAnimation(q, true)
        this.itemAnimation(s1, 0, true)
        this.itemAnimation(s2, 300, true)
        this.itemAnimation(s3, 600, true)
    }
   
}