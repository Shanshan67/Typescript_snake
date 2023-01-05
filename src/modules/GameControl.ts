import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
//游戏控制器，控制其他所有的类
class GameControl{
    //将3个类引入后，要先定义属性，再操作
    snake:Snake
    food:Food
    scorePanel:ScorePanel
    direction:string = ''//创建一个属性来存储蛇的移动方向（也就是按键的方向）
    isLive = true//创建一个属性记录游戏是否结束
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10,1)
        this.init()//初始化游戏让它开始
    }
    init(){//游戏的初始化方法，index.ts调用后游戏就开始
        //绑定键盘按键按下后的事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))//26.16:32讲解bind，因为是作为函数调用的所以要用bind，相当于创建一个新函数
        this.run()//调用run方法，使蛇移动
    }
    keydownHandler(event:KeyboardEvent){//创建键盘按下的响应函数，使代码更清晰
        //需要检查event.key的值是否合法（用户是否按了正确的按键）
        //event.key=>ArrowUp ArrowDown ArrowLeft ArrowRight 这四个均为字符串
        this.direction=event.key//修改direction属性
    }
    run(){//控制蛇移动的方法，根据方向（this.direction）来使蛇的位置改变
        //获取蛇现在的坐标
        let X=this.snake.X
        let Y=this.snake.Y
        //根据按键方向来修改x y
        switch (this.direction) {
            case "ArrowUp"://向上移动top减少
            case "Up"://ie浏览器上
                Y -= 10
                break
            case "ArrowDown"://向下移动top增加
            case "Down"://ie浏览器上
                Y += 10
                break
            case "ArrowLeft"://向左移动left减少
            case "Left"://ie浏览器上
                X -= 10
                break
            case "ArrowRight"://向右移动left增加
            case "Right"://ie浏览器上
                X += 10
                break
        }
        this.checkEat(X,Y)
        //修改蛇的x y的值
        try {
            this.snake.X = X
            this.snake.Y = Y
        }catch (error){//进入catch说明出现了异常，弹出提示消息，并关闭游戏
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            alert(errorMessage)
            this.isLive=false
        }

        //开启一个定时调用 让蛇可以自动移动
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)
    }
    //检查蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X===this.food.X && Y===this.food.Y){
            this.food.change()//食物的位置要重置
            this.scorePanel.addScore()//分数增加
            this.snake.addBody()//蛇要增加一个div
        }
    }
}

export default GameControl