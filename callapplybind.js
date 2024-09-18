//1. js数据类型
// 原始数据类型  undefined null Boolean String Number Symbol bigint
// 引用数据类型  object

//2. 判断js数据类型方法
// typeof   instanceof 只能判断引用数据类型
//Object.prototype.toString.call()
//3. null 和undefine的区别
// null表示空  ，undefined表示未定义 如果未声明一个变量，但是给这个变量赋值 输出就为undefined

//js 数据类型转化分为两种
// 显示类型转化
Number(); //字符串转化数字
parseInt(); //parseInt函数逐个解析字符，遇到不能转换的字符就停下来
String(); //将任意值转化为字符串    不管是什么类型都转为字符串   对象转为 [object,object]
Boolean(); //将任意值转为boolean  引入数据类型转为true    非空字符串是true  空字符为false
// 隐式类型转化
// 就是通过运算符  +法 或者-法
// 字符串abc  -数字   为 NaN 不是个值

// 深拷贝和浅拷贝的区别
// 1.浅拷贝
// 浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝,但是只能拷贝一层
// 如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址
// 即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址
// Object.assign 使用拓展运算符实现的复制 都是浅拷贝
// 2.深拷贝
// 深拷贝开辟一个新的栈，两个对象属性完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性
// JSON.stringify()   但是这种方式存在弊端，会忽略undefined、symbol和函数
// loadsh库  cloneDeep

// 区别：浅拷贝只能拷贝一层，深拷贝能拷贝整个对象
// 浅拷贝和深拷贝都创建出一个新的对象，但在复制对象属性的时候，行为就不一样
// 浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象
// 但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

// 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址
// 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址

// 4.闭包 +
// 定义：一个函数内部有权访问函数外面变量，就称为闭包
// 作用:
// 在JavaScript中，没有支持声明私有变量，但我们可以使用闭包来模拟私有方法
// 保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。
// 保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化
// 创建多个定时器

// 9.作用域与作用域链
// 作用域就是一个变量可以作用的范围 全局作用域  函数作用域  块级作用域
// 作用域链是 一个变量没有定义时会现在当前作用域中查找
// 如果没有会向父级作用域查找，没有在一层一层查找，知道找到全局作用域

// 10.this指向问题
// 全局作用域中this指向windows 对象内部函数this指向这个函数本身
// 构造函数 this指向这个函数的实例 箭头函数没有自己的this

// 12.判断数组方法
// let a='234'
// console.log(Array.isArray(a));
// console.log(a instanceof Array);
// console.log(Object.prototype.toString.call(a).slice(8,13)==="Array");
// splice增加和删除数组元素  slice分割出一部分数组 前闭后开

// 13.将类数组对象转化为数组
// let b={
//     "0":1,
//     "1":2
// }
// console.log(Array.from(b));9

// 14.数组原生方法
// toString join push pop unshift shift splic分割数组元素  splice删除或新增特定数组元素  contact 合并数组
// 数组变量  forEach  filter some  every  map
// some检测元素是否满足指定条件

// 15.new操作符实现原理
// new是一个创建对象实例的关键字，可以调用构造函数，将对象绑定到构造函数的this上
// new 操作符的执行过程
// 在JavaScript中 new操作符用来创建构造函数的关键子，他的执行过程是:
// 首先会创建一个空对象，因为要访问到构造函数原型上面的一些方法，
// 所有第二步就是让空对象的原型等于构造函数的原型对象，
// 并且要访问到构造函数身上的属性，
// 所以调用构造函数让他的this指向空对象，最后判断他的返回类型
// 如果构造函数返回一个非原始值（对象或函数），则返回该值；否则返回新创建的对象
function _new(Func, ...args) {
  let obj = {};
  obj.__proto__ = Func.prototype;
  let result = Func.apply(obj, args);
  return result instanceof Object ? result : obj;
}
// JavaScript事件模型
// javaScript事件可以理解为HTML文档或者浏览器中发生的一种交互操作
// 事件流  因为DOM是一个树状结构，父节点触发事件时，触发字节的会有顺序
// 事件捕获阶段(capture phase)
// 处于目标阶段(target phase)
// 事件冒泡阶段(bubbling phase)

// 事件冒泡是从下往上进行传播
// 事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接受事件, 而最具体的节点（触发节点）最后接受事件

// 事件模型 有三种
// 原始事件模型  标准事件模型  IE事件模型（基本不用）

// 原始事件模型  直接在HTML进行绑定  只支持冒泡，不支持捕获
// 标准事件模型 addEventListener进行绑定  三个阶段 事件捕获 事件处理 事件冒泡  第三个参数是 是否在捕获阶段进行处理

// 事件委托|事件代理
// 它允许你将事件监听器添加到父元素或祖先元素上，而不是直接添加到目标元素上。
// 这样，当事件在子元素上被触发时，它会冒泡到父元素或祖先元素，从而触发在父元素或祖先元素上设置的事件监听器。
// 作用：
// 如果页面上有大量的元素需要添加事件监听器，将监听器添加到它们的父元素上可以减少内存使用和DOM操作。

// 16.for...in 与for..of的区别
// for...in 遍历键名
// for...of 遍历键值 ,不能遍历普通对象，因为普通对象不是一个可迭代的对象
// for..in会遍历整个原型链性能较差，for..of只会遍历当前对象

// let obj123 = {
//     0: 'zs',
//     1: '4456',
//     2: "jk"
// }
// for (let value of Object.values(obj123)) {
//     console.log(value);
// }
//for 和forEach的区别
//for可以控制遍历过程，可以使用break跳出循环，forEach不能使用break和continue跳出循环
//for可以定义循环控制变量 i 可以设置遍历元素的起始位置

// 17.forEach 与map的区别
// forEach会改变原数组，map会返回一个新数组，
// forEach没有返回值，map新数组的值为函数处理之后的值

// ES6
//  var let const 区别
// 1.块级作用域 let const 都存在块级作用域 var没有块级作用域
// 2.变量提升 var 会发生变量提升 ，let和const不存在变量提升，必须在变量声明之后使用，否则会发生报错
// 3.重复声明  var声明变量时候，可以重复声明变量，let和const不行
// 4.初始值设置 var 和 let  不需要设置初始值  const必须设置初始值
// 5.暂时性死区 let和const在声明之前都是不可以使用的，这称为暂时性死区，var不存在暂时性死区

// ES6新增哪些方法
//flat() 数组扁平化 扩展运算符 ... 箭头函数 模板字符串
//findIndex() 找到符合条件的值，符合返回索引，不符合返回-1
//Object.assign() 合并两个数组 Object.getPrototypeOf()  Object.setPrototypeOf()

//  1.1  箭头函数
// 1.箭头函数比较简洁，如果只有一个参数可以省略括号
// 2.箭头函数返回值只有一条语句可以省略大括号
// 3.箭头函数没有自己的this，箭头函数的this指向自己上一层所继承的this
// 4.call apply bind 并不能改变箭头函数的this指向
// 5.箭头函数是一个匿名函数，他不能作为构造函数使用new关键字

// 2.1. call apply bind区别
// 1.call 可以调用函数,可以改变函数中this的指向 call第一个参数为this，后面可以传递一个参数列表
// 2.apply可以调用函数，可以传递一个this，第二个参数传递数组或者类数组的对象
// 3.bind可以调用函数，可以改变this指向，bind不会立即执行函数,需要手动调用

//Set和Map的区别
// Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构
//共同点：集合、字典都可以存储不重复的值
// 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

// 说说你对Promise的理解
// Promise是一种异步编程解决方案，他可以解决回调地狱的问题
// Promise实例有三种状态 分别是初始状态，成功状态，失败状态
// Promise then catch all  allsettled  （可以并行完成多个Promise任务）
// all和allsettled 区别
// Promise.all 并行完成多个Promise任务，只要有一个失败，Promise就会失败
// Promise.allsettled，不管其中一个Promise是否成功或者失败，他都会以一个数组形式返回出来
// let promise1=Promise.resolve('123')
// let Promise2=Promise.reject('失败')
// let promsie3=new Promise((resolve,reject)=>{
//     resolve('我成功了')
// })

// Promise.allSettled(['promise1','Promise2','promsie3']).then(value=>{
//     console.log(value);
// })
// Promise.rice()
// Promise.race() 方法允许我们同时发起多个异步操作，并在其中一个操作解决（fulfilled）或拒绝（rejected）时得到结果。
// 只要有一个成功就会返回结果
/**
 * @param {number} a
 * @param {string} b
 * @returns {number}
 *
 */
function getNUm(a, b) {
  return a + b;
}
console.log();
/**
 * @param {boolean} num
 * @param {number} num1
 * @param {type} total - description - description- description
 */

const getNum = (num) => {
  console.log(num);
};
getNUm(true)

// async和await
// async是声明异步函数，表示这个函数是异步的，代码执行可以先跳过他，await等待一个异步方法执行完成

// ES6模块和CommonJs有什么不同
// ES6用的import export
// CommonJs用的是require   Module.exports

//js事件循环机制
// JavaScript 是一个单线程语言，意味着它一次只能处理一个任务。在执行代码时，
// JavaScript 区分同步代码和异步代码。同步代码按照从上到下的顺序执行，而异步代码则会在稍后的某个时间点执行。
// 异步代码的执行涉及到宏任务和微任务的概念。宏任务包括整体代码、setTimeout、setInterval、Ajax 请求等；
// 而微任务则包括 Promise.then、process.nextTick（在 Node.js 中）等。
// 当执行到一段同步代码时，如果遇到宏任务（如 setTimeout），会将其添加到宏任务队列中，
// 并继续执行后续的同步代码。当所有同步代码执行完毕后，会开始执行微任务队列中的所有任务。
// 只有当所有微任务都执行完毕后，才会回到宏任务队列，执行下一个宏任务。这个过程会不断重复，形成事件循环。