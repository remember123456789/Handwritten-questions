// 简易浅拷贝
// 1. 参数对象和参数对象的每个数据项的数据类型范围仅在数组、普通对象（{}）、基本数据类型中]
//2. 无需考虑循环引用问题
//
//
function shallowCopy(obj) {
  // 判断是否为对象，如果不是就不进行拷贝
  if (typeof obj == "object" && typeof obj !== null) {
    const result = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      result[key] = shallowCopy(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
}

// 浅拷贝只复制对象的第一层属性，如果属性值是对象或数组，则只复制引用。
let obj = {
  name: "zs",
  age: 18,
  info: {
    address: "北京",
  },
};

let newObj = shallowCopy(obj);

obj.name = "lisi";
console.log(obj, "obj");
console.log(newObj, "newObj");

// 浅拷贝
// 请补全JavaScript代码，要求实现一个对象参数的浅拷贝并返回拷贝之后的新对象。
// 注意：
// 1. 参数可能包含函数、正则、日期、ES6新对象

const _shallowClone = (target) => {
  // 补全代码
  return Object.assign({}, target);
};
