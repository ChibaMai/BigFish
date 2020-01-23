/** 主程序入口
 * 1. 创建多个变量保证游戏中不同角色可以相互调用
 * 2. 创建游戏所有角色对象
 * 3. 调用所有角色绘制方法
 */

// 创建画布变量
let canvas1,
  canvas2,
  // 创建两支画笔
  ctx1,
  ctx2,
  // 创建变量保存画布的宽度和高度
  canWidth,
  canHeight,
  // 创建全局变量爆粗两帧画面之间的时间差
  lastTime,
  // 时间差
  deltaTime,
  // 创建保存背景图片对象
  bgPic,
  // 创建全局变量保存海葵对象
  ane,
  // 创建全局对象保存食物对象
  fruit,
  // 创建全局对象保存大鱼对象
  mom,
  // 创建全局变量保存鼠标的位置
  mx,
  my,
  // 使用全局变量保存分数对象
  data,
  // 使用全局变量保存吃掉食物的光环
  wave,
  // 使用全局变量保存小鱼对象
  bady;

// 创建函数 game
function game() {
  init();
  gameloop();
  return;
}

// 创建函数 init
function init() {
  // 初始化变量  进行赋值
  canvas1 = document.getElementById("canvas1");
  canvas2 = document.getElementById("canvas2");

  ctx1 = canvas1.getContext("2d");
  ctx2 = canvas2.getContext("2d");

  canWidth = canvas1.width;
  canHeight = canvas1.height;

  // 记录时间差
  lastTime = Date.now();
  // 初始值为 0
  deltaTime = 0;

  // 创建图片对象
  bgPic = new Image();
  bgPic.src = "src/background.jpg";

  // 初始 ane 海葵对象调用初始化方法
  ane = new aneObj();
  ane.init();

  // 创建 fruitObj 对象调用初始化方法
  fruit = new fruitObj();
  fruit.init();
  
  // 创建 momObj 对象
  mom = new momObj();
  mom.init();
  // 初始化 mx my 大鱼的位置
  mx = canWidth * 0.5;
  my = canHeight * 0.5;

  // 为画布 1 绑定鼠标移动事件
  canvas1.addEventListener("mousemove", handleMove);

  // 创建 dataObj 对象
  data = new dataObj();

  // 创建 waveObj 对象
  wave = new waveObj();
  wave.init();

  // 创建 badyObj 对象
  bady = new badyObj();
  bady.init();  

  return;
}

// 创建函数 gameloop
function gameloop() {
  // 创建定时器执行 gameloop 多调用结果
  requestAnimationFrame(gameloop);
  // 获取刚绘制完成的时间点
  let now = Date.now();
  // 将完成时间点减去没绘制图形时间开始点
  deltaTime = now - lastTime;
  // 将上一个时间修改为 now
  lastTime = now;
  
  // 绘制背景图片
  ctx2.drawImage(bgPic, 0, 0);

  // 调用绘制海葵的方法
  ane.draw();

  // 调用监听画布函数
  fruitMonitor();
  // 绘制食物
  fruit.draw();

  // 清除画布 1 所有的元素
  ctx1.clearRect(0, 0, canWidth, canHeight);
  // 绘制大鱼
  mom.draw();

  // 调用碰撞方法(及大鱼吃掉食物移除食物)
  momFruitsCollison();

  // 调用分数绘制方法
  data.draw();

  // 绘制光环
  wave.draw();

  // 绘制小鱼
  bady.draw();

  return;
}

// 当网页加载成功后调用 game
document.body.onload = game;

// 创建函数处理鼠标移动事件
function handleMove(event) {
  mx = event.offsetX;
  my = event.offsetY;
}
