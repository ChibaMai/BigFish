/** 得分后显示光环
 * 创建光环的构造函数 waveObj
 */

class waveObj {

  // 属性
  constructor() {
    // 光环的个数
    this.num = 10;
    // 属性圆心
    this.x = [];
    this.y = [];
    // 属性半径
    this.r = [];
    // 状态  显示 和隐藏
    this.alive = [];
  }

  // 添加初始化 init 方法
  init() {
    // 循环遍历每一个光环
    for (let index = 0; index < this.num; index++) {
      // 状态 false
      this.alive[index] = false;
      // 半径 0
      this.r[index] = 0;
      // 圆心 0
      this.x[index] = 0;
      this.y[index] = 0;
    }
  }

  // 添加绘制方法 draw 
  draw() {
    // 保存画笔 1 的状态
    ctx1.save();
    // 修改光环颜色
    ctx1.strokeStyle = "white";
    // 创建循环遍历所有的状态
    for (let index = 0; index < this.num; index++) {
      // 判断是否时显示光环
      if (this.alive[index]) {
        // 当前半径增加
        this.r[index] += deltaTime * 0.04;

        // 如果光环半径大于 100
        if (this.r[index] > 55) {
          // 将当前光环状态修改为 false
          this.alive[index] = false;
          // 一次隐藏一个光环
          return;
        }

        // 开始一条新的路径
        ctx1.beginPath();
        // 绘制光环
        ctx1.arc(this.x[index], this.y[index], this.r[index], 0, 2 * Math.PI);
        // 描边
        ctx1.stroke();
        // 恢复画笔 1 的状态
      }
    } // end for
    ctx1.restore();
  }

  // 为光环添加出生的方法
  bron(x, y) {
    // 循环遍历光环
    for (let index = 0; index < this.num; index++) {
      // 查找第一个为 false 的光环
      if (this.alive[index] === false) {
        this.alive[index] = true;
        this.x[index] = x;
        this.y[index] = y;
        this.r[index] = 20;
        // 一次出生一个
        return;
      }      
    }
  }

}
