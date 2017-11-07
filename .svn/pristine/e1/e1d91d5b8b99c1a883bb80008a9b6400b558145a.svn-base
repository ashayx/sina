class Question extends Page{
    init() {

    }
    public questionArray: Array<number>
    public selectArray: Array<number>
    public answerArray: Array<number>
    /**
     * createQuestion
     * setQuestion,出题数
     * AllQuestion，所有题目数量
     */
    public createQuestion(setQuestion: number, AllQuestion: number) {
        let arr = []
        for (var i = 1; i <= AllQuestion; i++) {
            arr.push(i)
        }
        let out = [];
        while (out.length < setQuestion) {
            var i = Math.floor(Math.random() * arr.length)
            out.push(arr.splice(i, 1)[0])
        }
        // let question = out.join(',')
        return out
    }
    /**
     * getAnswer
     */
    public getAnswer(arr) {
        return arr.join(',')
    }
    /**
     * getQusetion
     */
    public getQusetion() {


    }
}