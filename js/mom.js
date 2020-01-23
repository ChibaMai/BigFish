/** 大鱼
 * 1. 大鱼身体切换[活动鱼]
 * 2. 大鱼面向鼠标旋转
 */

//  创建大鱼的构造函数
class momObj {
  
  // 初始化数据变量
  constructor() {
    // 大鱼的位置
    this.x;
    this.y;
    // 大鱼游动的角度
    this.angle;
    // 创建数组保存大鱼的眼睛
    this.bigEye = [];
    // 创建数组保存大鱼的身体
    this.bigBody = [];
    // 创建数组保存大鱼的尾巴
    this.bigTail = [];

    // 创建变量切换眼睛
    this.bigEyeIndex = 0;
    this.bigEyeStart = 0;
    this.bigEyeEnd = 3000;

    // 大鱼尾巴切换  0-7
    this.bigTailIndex = 0;
    this.bigTailStart = 0;
    this.bigTailEnd = 150;

    // 大鱼身体切换  0-7
    this.bigBodyIndex = 0;
    this.bigBodyStart = 0;
    this.bigBodyEnd = 3000;

  }

  // 为大鱼创添加 init 初始化方法
  init() {
    // 初始化 x, y 画布中心
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    // 初始化游动的角度 0
    this.angle = 0;

    // 创建两个图片对象保存到大鱼眼睛的数组，并且下载图片
    for (let i = 0; i < 2; i++) {
      this.bigEye[i] = new Image();
      this.bigEye[i].src = `../src/bigEye${i}.png`;
    }

    // 创建八张图片对象保存到大鱼身体数组中，并且下载图片
    for (let i = 0; i < 8; i++) {
      this.bigBody[i] = new Image();
      this.bigBody[i].src = `../src/bigSwim${i}.png`;
    }

    // 创建八张图片对象保存到大鱼外吧数组中，并且下载图片
    for (let i = 0; i < 8; i++) {
      this.bigTail[i] = new Image();
      this.bigTail[i].src = `../src/babyTail${i}.png`;
    }

    return;
  }

  // 为大鱼添加 draw 绘制方法
  draw() {
    // 累加大鱼眼睛的计时  如果大鱼 3000 切换下标
    this.bigEyeStart += deltaTime;
    // 眼睛切换
    if (this.bigEyeStart > this.bigEyeEnd) {
      // 切换下标
      this.bigEyeIndex = (this.bigEyeIndex + 1) % 2;
      // 清空计时
      this.bigEyeStart = 0;
      if (this.bigEyeIndex === 0) {
        this.bigEyeEnd = 3000;
      }
      
      // 如果闭眼则 缩短 bigEyeEnd 的值
      if (this.bigEyeIndex === 1) {
        this.bigEyeEnd = 150;
      }
    }

    // 大鱼尾巴切换
    this.bigTailStart += deltaTime;
    if (this.bigTailStart > this.bigTailEnd) {
      // 切换下标
      this.bigTailIndex = (this.bigTailIndex + 1) % 8;
      // 清空计时
      this.bigTailEnd = 0;
    }

    // 大鱼身体切换
    this.bigBodyStart += deltaTime;
    if (this.bigBodyStart > this.bigBodyEnd) {
      // 切换下标
      this.bigBodyIndex = (this.bigBodyIndex + 1) % 8;
      // 从新计时
      this.bigBodyStart = 0;
    }
    
    // 将鼠标的位置赋值个大鱼的坐标 lerpDistance 计算速度
    this.x = lerpDistance(mx, this.x, 0.97);
    this.y = lerpDistance(my, this.y, 0.98);
    
    // 修改大鱼的角度
    // 计算大鱼与鼠标之间坐标
    let deltaX = mx - this.x,
      deltaY = my - this.y;
    // 计算大鱼与鼠标角度
    let beta = Math.atan2(deltaY, deltaX) + Math.PI;
    // 计算大鱼向鼠标角度慢慢调整
    this.angle = lerpAngle(beta, this.angle, 0.9);

    // 保存画笔 1 的状态
    ctx1.save();
    // 将画布原点移动到大鱼身上中心
    ctx1.translate(this.x, this.y);
    // 设置大鱼旋转的角度
    ctx1.rotate(this.angle);
    // 绘制大鱼  身体  尾巴  眼睛
    ctx1.drawImage(this.bigBody[this.bigBodyIndex],
      -this.bigBody[this.bigBodyIndex].width * 0.5,
      -this.bigBody[this.bigBodyIndex].width * 0.5
    );
    // tail
    ctx1.drawImage(this.bigTail[this.bigTailIndex],
      -this.bigTail[this.bigTailIndex].width * 0.5 + 29,
      -this.bigTail[this.bigTailIndex].width * 0.5 - 2
    );
    // Eye
    ctx1.drawImage(this.bigEye[this.bigEyeIndex],
      -this.bigEye[this.bigEyeIndex].width * 0.5,
      -this.bigEye[this.bigEyeIndex].width * 0.5 + 3
    )

    // 恢复画笔 1 的状态
    ctx1.restore();
  }
  
}
