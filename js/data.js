/** 得分
 * 创建分数构造函数 dataObj
 * 为构造函数添加绘制方法 draw
 */

class dataObj {

  // 创建共用属性
  constructor() {
    // 定义分数 score
    this.score = 0;
  }

  // 绘制分数
  draw() {
    // 保存画笔 1 状态
    ctx1.save();
    // 修改画笔 1 填充的样式
    ctx1.fillStyle = "white"
    // 修改画笔 1 的文字大小
    ctx1.font = "30px SimHei";
    // 修改画笔 1 的文字居中
    ctx1.textAlign = "center";
    // 绘制文本
    ctx1.fillText(`SCORE: ${this.score}`, canWidth * 0.5, canHeight * 0.8);
    // 清除画笔 1 状态
    ctx1.restore();
  }

  /**
   * 为构造函数分数添加方法 add
   * type 大鱼迟到的食物
   * @param {*} type 1 表示蓝色食物  2 表示黄色食物
   */
  add(type) {
    this.score += 100 * (type);
  }

}
