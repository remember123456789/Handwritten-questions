// 函数柯里化

// const add = (x) => (y) => x + y;

// const adds = (x) => {
//   return (y) => {
//     return (z) => {
//       return x + y + z;
//     };
//   };
// };
// console.log(adds(1)(1)(1));

/**
 * 柯里化：将 fn(a,b,c) 转为 fn(a)(b)(c)
 * @param {Function} fn - 原函数
 * @returns {Function} 柯里化后的函数
 */
function curry(fn) {
  return function curried(...args) {
    // 参数收集完毕，执行原函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // 参数不够，返回新函数继续收集
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// ========== 使用示例 ==========

// 原函数
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6  ✅ 一次性传入
console.log(curriedSum(1)(2)(3)); // 6  ✅ 分三次传入
console.log(curriedSum(1, 2)(3)); // 6  ✅ 分两次传入
console.log(curriedSum(1)(2, 3)); // 6  ✅ 混合传入

// 偏函数应用（Partial Application）
const addOne = curriedSum(1); // 固定第一个参数
const addOneAndTwo = addOne(2); // 固定第二个参数
console.log(addOneAndTwo(10)); // 13 ✅ 1 + 2 + 10

const curry = (fn, ...args) =>
  // 函数的参数个数可以直接通过函数数的.length属性来访问
  args.length >= fn.length // 这个判断很关键！！！
    ? // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
      fn(...args)
    : /**
       * 传入的参数小于原始函数fn的参数个数时
       * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
       */
      (..._args) => curry(fn, ...args, ..._args);

function add1(x, y, z) {
  return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));



