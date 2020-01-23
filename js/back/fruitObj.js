/** 食物
 * 1. 创建功能食物
 * 2. 监听画布上活动的食物发是否有 15 个
 *    不足 15 个挑一个食物出生
 * 3. 添加属性 30 
 * 4. 添加初始方法 init
 * 5. 添加绘制方法 draw
 */

class fruitObj  {

  constructor() {
    // 为构造函数添加 30
    this.num = 30;
    // 添加食物状态属性 alive  true显示  false隐藏
    this.alive = [];
    // 创建二个图形对象
    this.blue = new Image();
    this.orange = new Image();
    // 创建位置数组 x,y 保存食物位置
    this.x = [];
    this.y = [];
    // 创建数组 l 保存图片的宽度和高度
    this.l = [];
    // 创建数组保存速度 sped 生长向上漂浮
    this.sped = [];
    // 创建数组保存食物类型 "blue" "orange"
    this.fruitType = [];
    // 创建数组保存第几个海葵
    this.aneNo = [];
  }

  // 添加初始方法 init
  init() {
    // 创建循环遍历数组中所有的食物
    for (let i = 0; i < this.num; i++){
      // 创建食物的位置  编号  速度  类型
      this.alive[i] = false;
      this.x[i] = 0;
      this.y[i] = 0;
      this.l[i] = 0;
      this.fruitType[i] = "";
      this.sped[i] = 0;
    }
    // 循环外部，下载张图片
    this.blue.src = "../../src/blue.png";
    this.orange.src = "../../src/fruit.png";
  }

  // 添加绘制方法
  draw() {
    // 创建循环遍历每个食物
    for (let i = 0; i < this.num; i++) {
      // 判断当前食物是否式活动
      if (this.alive[i]) {
        // 判断当前食物类型
        if (this.fruitType[i] === "blue") {
          var pic = this.blue;
        } else {
          var pic = this.orange;
        } // end fruitType if 

        // 判断当前食物宽度 <= 14 
        if (this.l[i] <= 14) {
          // 则修改 l
          this.l[i] += this.sped[i] * deltaTime;
        } else {
          // 修改 y
          this.y[i] -= this.sped[i] * deltaTime * 4;
        } // end l if

        // 绘制食物
        ctx2.drawImage(pic,
          this.x[i], this.y[i],
          this.l[i], this.l[i]
        );

      } // end alive if
      // 如果当前食物漂浮屏幕
      // 将当前食物的状态修改隐藏
      if (this.y[i] < 10) {
        this.alive[i] = false;
      }
    } // end for

    return;
  }

  // 添加出生食物构造函数方法
  bron(i) {
    // 获取第几个海葵 下标
    let idx = Math.round(ane.num * Math.random());
    // 获取海葵当前的终点坐标 x,y
    let hx = ane.headx[idx];
    let hy = ane.heady[idx];
    // 依据终点坐标  赋值当前食物
    this.x[i] = hx;
    this.y[i] = hy;
    // 修改当前食物状态 true
    this.alive[i] = true;
    // 修改当前食物宽高 0
    this.l[i] = 0;
    // 修改食物类型
    this.fruitType[i] = Math.random() < 0.9 ? "blue" : "orange";
    // 修改食物速度
    this.sped[i] = Math.random() * 0.017;
  }

  // 为食物添加构造方法 食物消失
  dead(i) {
    this.alive[i] = false;
  }

}


// 创建全局监听函数获取画布上的食物
function fruitMonitor() {
  // 记录累加状态的几个元素
  let num = 0;

  // 遍历数组显示当前状态 ++
  for (let i = 0; i < fruit.num; i++) {
    if (fruit.alive[i]) num++;
  }

  // console.log(num);
  
  if (num < 15) {
    // 挑一个食物
    sendFruit();
    // 一次挑一个
    return;
  }
}

// 创建全局函数  按下标去第一个
function sendFruit() {
  for (let i = 0; i < fruit.num; i++){
    // 判断状态是否是隐藏  找到第一个食物出生 [i]
    if (fruit.alive[i] == false) {
      fruit.bron(i);
      return;
    }
  }
}
