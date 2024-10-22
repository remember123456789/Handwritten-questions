//数字马力
// 格式判断 easy算法 柯里化 Dom原生操作之类的
// 1、判断字符串格式
//      题目要求:判断字符串是否符合XXX-XXX-XXXX的格式，其中X为number类型
// 2、柯里化
// 3、返回开平方根
// 4、颜色转换
//      题目要求:颜色转化rgb->16进制'，后面的空格数不固定，不符合格式直接返回输入值
// 5、文本高亮
//      单选题和多选题
// \s 匹配任何空白字符，包括空格、制表符、换页符等等。
// 等价于 [ \f\n\r\t\v]。注意 Unicode 正则表达式会匹配全角空格符。
// i	ignore - 不区分大小写	将匹配设置为不区分大小写，搜索时不区分大小写: A 和 a 没有区别。
function rgbToHex(color) {
  // 检查输入是否为有效的RGB格式
  const rgbPattern = /^rgb\s*\(\s(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
  const match = color.match(rgbPattern);
  if (!match) {
    // 如果不匹配，返回原输入
    return color;
  }

  // 提取RGB值
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  console.log(r.toString(16));

  // 转换为16进制并拼接字符串
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  // 确保结果为6位16进制数，不足部分补0
  while (hex.length < 7) {
    hex = "0" + hex;
  }

  return hex.toUpperCase();
}

let test = /^rgb\s*\(\s(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
// 测试
console.log(rgbToHex("rgb( 255 , 165, 0)")); // 输出: #FFA500

// console.log(rgbToHex("rgb (255, 165, 0)")); // 输出: 输入值，因为格式不正确
// console.log(rgbToHex("rgba(255, 165, 0, 0.5)")); // 输出: 输入值，因为包含alpha值

function matchesPattern(str) {
   let reg=/^\d{3}-\d-{3}-\d{4}$/
   console.log(reg.test(str));
   return reg.test(str)

}

matchesPattern("800-555-1212");
