/** 小鱼
 * 1. 绘制尾巴 眼睛 身体
 * 2. 小鱼时跟着大鱼移动的
 */

class badyObj {

  // 属性
  constructor() {
    // 小鱼的位置坐标
    this.x;
    this.y;
    // 小鱼游动的角度
    this.angle;
    // 小鱼的眼睛 身体 尾巴 等图片
    this.badyEye = [];
    this.badyBody = [];
    this.badyTail = [];

    // 创建变量切换眼睛
    this.badEyeIndex = 0;
    this.badEyeStart = 0;
    this.badEyeEnd = 3000;

    // 小鱼尾巴切换  0-7
    this.badTailIndex = 0;
    this.badTailStart = 0;
    this.badTailEnd = 150;

    // 小鱼身体切换  0-7
    this.badBodyIndex = 0;
    this.badBodyStart = 0;
    this.badBodyEnd = 4000;
  }

  // 添加初始化方法
  init() {
    // 创建初始化变量 小鱼的出生位置
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    // 初始化游动的角度
    this.angle = 0;

    // 创建两个图片对象保存到小鱼眼睛的数组，并且下载图片
    for (let index = 0; index < 2; index++) {
      this.badyEye[index] = new Image();
      this.badyEye[index].src = `../src/babyEye${index}.png`;
    }

    // 创建两个图片对象保存到小鱼身体的数组，并且下载图片
    for (let index = 0; index < 19; index++) {
      this.badyBody[index] = new Image();
      this.badyBody[index].src = `../src/babyFade${index}.png`;
    }

    // 创建两个图片对象保存到小鱼尾巴的数组，并且下载图片
    for (let index = 0; index < 8; index++) {
      this.badyTail[index] = new Image();
      this.badyTail[index].src = `../src/babyTail${index}.png`;
    }

  }

  // 添加绘制方法
  draw() {
    // 设置小鱼的眼睛切换
    this.badEyeStart += deltaTime;
    // 眼睛切换
    if (this.badEyeStart > this.badEyeEnd) {
      // 切换下标
      this.badEyeIndex = (this.badEyeIndex + 1) % 2;
      // 清空计时
      this.badEyeStart = 0;
      if (this.badEyeIndex === 0) {
        this.badEyeEnd = 3000;
      }
      
      // 如果闭眼则 缩短 bigEyeEnd 的值
      if (this.badEyeIndex === 1) {
        this.badEyeEnd = 150;
      }
    }

    // 设置小鱼的尾巴切换
    this.badTailStart += deltaTime;
    if (this.badTailStart > this.badTailEnd) {
      // 切换下标
      this.badTailIndex = (this.badTailIndex + 1) % 8;
      // 清空计时
      this.badTailEnd = 0;
    }

    // 设置小鱼的身体切换
    this.badBodyStart += deltaTime;
    if (this.badBodyStart > this.badBodyEnd) {
      // 切换下标
      this.badBodyIndex = (this.badBodyIndex + 1) % 19;
      // 从新计时
      this.badBodyStart = 0;
    }

     // 计算大鱼的坐标赋值给小鱼 lerpDistance 计算速度
    this.x = lerpDistance(mom.x, this.x, 0.95);
    this.y = lerpDistance(mom.y, this.y, 0.96);

    // 角度转换
    let deltaX = mom.x - this.x,
      deltaY = mom.y - this.y;
    // 计算大鱼与小鱼角度
    let bata = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(bata, this.angle, 0.9);

    // 保存画笔 1
    ctx1.save();
    // 将小鱼原点移动到大鱼中心
    ctx1.translate(this.x, this.y);
    // 设置大鱼小鱼的角度
    ctx1.rotate(this.angle);
    // 绘制大鱼 身体  尾巴 眼睛
    ctx1.drawImage(this.badyBody[this.badBodyIndex],
      -this.badyBody[this.badBodyIndex].width * 0.5,
      -this.badyBody[this.badBodyIndex].height * 0.5,
    );
    // tail
    ctx1.drawImage(this.badyTail[this.badTailIndex],
      -this.badyTail[this.badTailIndex].width * 0.5 + 23,
      -this.badyTail[this.badTailIndex].height * 0.5,
    );
    // Eye
    ctx1.drawImage(this.badyEye[this.badEyeIndex],
      -this.badyEye[this.badEyeIndex].width * 0.5,
      -this.badyEye[this.badEyeIndex].height * 0.5,
    );
    // 清除画笔 1
    ctx1.restore();
  }

}
