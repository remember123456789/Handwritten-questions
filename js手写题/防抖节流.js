//数字马力
// 格式判断 easy算法 柯里化 Dom原生操作之类的
// 1、判断字符串格式 //简单
// 题目要求:判断字符串是否符合XXX-XXX-XXXX的格式，其中X为number类型
// 2、柯里化 //入门
// 3、返回开平方根
// 4、颜色转换
// 题目要求:颜色转化rgb->16进制'，后面的空格数不固定，不符合格式直接返回输入值
// 5、文本高亮
// 单选题和多选题                                                        

// 防抖节流
function fangdou(fn) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
// 节流
function jieliu(fn, delay) {
  let flag = true;

  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}



