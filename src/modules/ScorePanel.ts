class ScorePanel{
    //score level用来记录分数和等级
    score=0
    level=1
    // 分数和等级所在的元素，在构造函数中进行初始化
    scoreEle:HTMLElement
    levelEle:HTMLElement
    maxLevel:number
    upScore:number//设置一个变量表示达到多少分时才升级
    constructor(maxLevel=10,upScore=10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel=maxLevel
        this.upScore=upScore
    }
    addScore(){//设置一个加分的方法
        this.scoreEle.innerHTML= ++this.score+''//使分数自增，并通过拼接的方式变为字符串
        if(this.score%this.upScore===0){//判断分数是多少再升级
            this.levelUp()
        }
    }
    levelUp(){//提升等级的方法
        if(this.level<this.maxLevel){
            this.levelEle.innerHTML= ++this.level+''
        }
    }

}
export default ScorePanel