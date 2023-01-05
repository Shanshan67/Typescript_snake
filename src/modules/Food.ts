//定义食物类food
class Food{
    element:HTMLElement;//定义一个属性表示食物所对应的元素
    constructor() {
        this.element=document.getElementById('food')!;//获取页面中的food元素并将其赋值给element
    }
    get X(){//定义一个获取食物X轴坐标的方法
        return this.element.offsetLeft;
    }
    get Y(){//定义一个获取食物Y轴坐标的方法
        return this.element.offsetTop;
    }
    change (){
        //生成一个随机的位置，食物的位置最小是0 最大是290
        //蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须使整10
        let top =Math.round(Math.random()*29)*10
        let left =Math.round(Math.random()*29)*10
        this.element.style.top = top+'px'
        this.element.style.left = left+'px'
    }
}
export default Food