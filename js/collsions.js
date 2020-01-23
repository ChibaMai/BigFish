/** 碰撞检测
 * 大鱼碰撞到食物
 */

function momFruitsCollison() {
  // 创建循环遍历所有食物
  for (let index = 0; index < fruit.num; index++) {
    // 判断当前食物是否显示
    if (fruit.alive[index]) {
      // 计算当前食物与大鱼之前的距离
      let l = calLength2(fruit.x[index], fruit.y[index], mom.x, mom.y);
      
      // 如果两者之间小于 900
      if (l < 900) {
        // [食物/大鱼]消失
        fruit.dead(index);
        // 判断当前食物的类型 add
        let type = 1;
        if (fruit.fruitType[index] !== "blue") {
          type = 2;
        }
        // 累加分数
        data.add(type);
        // 显示奖励光环
        wave.bron(fruit.x[index], fruit.y[index]);

      }
    }
  }
}
