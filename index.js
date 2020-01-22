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
  ane;

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

  // 初始 ane 海葵对象
  ane = new aneObj();
  ane.init();

  console.log(ane);
  
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


  return;
}

// 当网页加载成功后调用 game
document.onload = game();
