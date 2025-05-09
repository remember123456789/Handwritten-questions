// new是一个创建对象实例的关键字，可以调用构造函数，将对象绑定到构造函数的this上
// function _new(Func, ...args) {
//     let obj = {}
//     obj.__proto__ = Func.prototype
//     let result = Func.call(obj, args)
//     return result instanceof Object ? result : obj
// }
//优化  Object.create ，创建一个空对象 让空对象的原型指向谁
/**
 * new操作符实现
 *  创建一个新的对象obj
 将对象与构建函数通过原型链连接起来
 将构建函数中的this绑定到新建的对象obj上
 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理
 */
function _new(Func, ...args) {
    let obj = Object.create(Func.prototype);
    let result = Func.apply(obj, args);
    return result instanceof Object ? result : obj
}
// function Person() {
//     this.name = 'zs'
// }
// var person = _new(Person)
// console.log(person);