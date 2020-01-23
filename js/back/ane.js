/** 海葵: 
 * 1. 海葵 50 条海葵
 * 2. 每一条起点坐标，终点坐标  控制点坐标(可通过计算得到不用保存)
 * 3. 摆动的幅度 5~50
 * 4. 创建变量保存正弦函数计算结果  -1~1
 */

// 创建海葵构造函数 aneObj
class aneObj {

  constructor() {
    // 为海葵构造函数添加属性 num = 50
    this.num = 50;
    // 创建变量保存起点坐标 x [y=600不用保存]
    this.rootx = [];
    // 创建变量保存终点坐标 x
    this.headx = [];
    // 创建变量保存终点坐标 y
    this.heady = [];
    // 创建变量保存摆动的幅度 amp
    this.amp = [];
    // 创建变量保存 -1~1 之间的值
    this.alpha = 0;
  }
  
  // 为海葵添加初始化方法 init
  init() {
    // 循环生成海葵
    for (let i = 0; i < this.num; i++) {
      // 初始化海葵起始点坐标  y固定值 600
      this.rootx[i] = i * 16 + Math.random() * 10;
      // 初始化海葵终点坐标 x [初始值是一条直线]
      this.headx[i] = this.rootx[i];
      // 初始化海葵终点坐标 y
      this.heady[i] = canHeight - 250 + Math.random() * 50;
      // 初始化海葵摆动的幅度 20~50
      this.amp[i] = Math.random() * 30 + 20;
      // 
    }
  }

  // 为海葵添加绘制方法 draw
  draw() {
    // 计算非常小的小数
    // 依据小数通过正弦函数获取 -1~1
    this.alpha += deltaTime * 0.0008;
    // 摆动的时间周期
    let l = Math.sin(this.alpha);

    // 保存画笔的状态
    ctx2.save();
    // 设置海葵外观样式
    ctx2.strokeStyle = "purple";
    ctx2.globalAlpha = 0.6
    ctx2.lineCap = "round";
    ctx2.lineWidth = 8;
    // 遍历每个海葵
    for (let i = 0; i < this.num; i++){ 
      // 创建新路径
      ctx2.beginPath();
      // 移动起点坐标 moveTo()
      ctx2.moveTo(this.rootx[i], canHeight);
      // 重新计算终点坐标 x  100+20*0.9
      this.headx[i] = this.rootx[i] + l * this.amp[i];
      // 绘制贝塞尔曲线  quadraticCurveTo  控制点x,y  终点x,y
      ctx2.quadraticCurveTo(
        this.rootx[i], canHeight - 100,
        this.headx[i], this.heady[i]
      );
      // 描边
      ctx2.stroke();
    } // end for
    // 回复画笔状态
    ctx2.restore();
  }

  // 在 idnex.js 中创建海葵对象
  // 且调用相关相关方法
}
