class Snake{
    element:HTMLElement
    head:HTMLElement
    bodies:HTMLCollection
    constructor() {
        this.element=document.getElementById('snake')!
        this.head=document.querySelector('#snake>div') as HTMLElement//断言
        this.bodies=this.element.getElementsByTagName('div')//因为身体是不断变化的
    }
    get X(){//获取蛇头的X坐标
        return this.head.offsetLeft;
    }
    get Y(){//获取蛇头的Y坐标
        return this.head.offsetTop;
    }
    set X(value){//设置蛇头的X坐标
        if(this.X===value){
            return
        }
        if(value<0 || value>290){//值的合法范围是0-290之间，进入判断说明蛇撞墙了，抛出异常
            throw new Error('蛇撞墙了')
        }
        //修改x时，是在修改水平坐标-在左右移动，蛇在向左移动时 不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft===value){//是否有第二节，坐标如果与蛇头的x坐标相等就是发生了掉头
            //如果发生了掉头，让蛇向反方向移动
            if(value>this.X){//如果新值value大于旧值x，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value=this.X-10
            }else{//与上面相反的方向
                value=this.X+10
            }
        }
        this.moveBody()
        this.head.style.left = value+'px'
        //检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(value){
        if(this.Y===value){
            return
        }
        if(value<0 || value>290){//值的合法范围是0-290之间，进入判断说明蛇撞墙了，抛出异常
            throw new Error('蛇撞墙了')
        }
        //修改y时，是在修改垂直坐标-在上下移动，蛇在向上移动时 不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop===value){//是否有第二节，坐标如果与蛇头的x坐标相等就是发生了掉头
            //如果发生了掉头，让蛇向反方向移动
            if(value>this.Y){//如果新值value大于旧值，
                value=this.Y-10
            }else{//与上面相反的方向
                value=this.Y+10
            }
        }
        this.moveBody()
        this.head.style.top = value+'px';
        //检查有没有撞到自己
        this.checkHeadBody()
    }
    addBody(){//蛇增加身体的方法
        this.element.insertAdjacentHTML("beforeend","<div></div>")//在结束标签前即最后插入div
    }
    moveBody(){//从后往前，将后边的身体设置为前边身体的位置
        for(let i=this.bodies.length-1; i>0; i--){
            //获取前一个身体的位置
            let X:any =(this.bodies[i-1] as HTMLElement).offsetLeft as number
            let Y:any=(this.bodies[i-1] as HTMLElement).offsetTop as number;
            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X +'px';
            (this.bodies[i] as HTMLElement).style.top = Y +'px';
        }
    }
    //检查蛇头是否撞到身体
    checkHeadBody(){
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd=this.bodies[i] as HTMLElement
            if(this.X===bd.offsetLeft && this.Y===bd.offsetTop){//进入判断说明蛇头撞到了身体，游戏结束即有error 后续有对error的处理
                throw new Error('撞到自己了')
            }
        }
    }
}

export default Snake