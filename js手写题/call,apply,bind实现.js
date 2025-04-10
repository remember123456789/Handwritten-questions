/**
 // 示例函数执行上下文
 // 定义全局变量
var globalVar = "I am a global variable";

function exampleFunction(param1, param2) {
  // 定义局部变量
  var localVar = "I am a local variable";

  console.log(globalVar); // 输出全局变量的值
  console.log(localVar); // 输出局部变量的值
  console.log(param1); // 输出第一个参数的值
  console.log(param2); // 输出第二个参数的值
}
*
exampleFunction("Hello", "World");
*
* 2.执行上下文
* JavaScript引擎使用执行上下文栈来管理执行上下文
当JavaScript执行代码时，首先遇到全局代码，会创建一个全局执行上下文并且压入执行栈中，每当遇到一个函数调用，
* 就会为该函数创建一个新的执行上下文并压入栈顶，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，
* 继续执行下一个上下文。当所有的代码都执行完毕之后，从栈中弹出全局执行上下文。
* 3. 创建执行上下文
创建执行上下文有两个阶段：创建阶段和执行阶段
1）创建阶段
（1）this绑定

在全局执行上下文中，this指向全局对象（window对象）
在函数执行上下文中，this指向取决于函数如何调用。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined

（2）创建词法环境组件

词法环境是一种有标识符——变量映射的数据结构，标识符是指变量/函数名，变量是对实际对象或原始数据的引用。
词法环境的内部有两个组件：加粗样式：环境记录器:用来储存变量个函数声明的实际位置外部环境的引用：可以访问父级作用域

（3）创建变量环境组件

变量环境也是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。

2）执行阶段
此阶段会完成对变量的分配，最后执行完代码。
简单来说执行上下文就是指：
在执行一点JS代码之前，需要先解析代码。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，
变量先赋值为undefined，函数先声明好可使用。这一步执行完了，才开始正式的执行程序。
在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，
不过函数执行上下文会多出this、arguments和函数的参数。
全局上下文：变量定义，函数声明
函数上下文：变量定义，函数声明，this，arguments

作者：前端少年汪
链接：https://juejin.cn/post/7314571744353681460
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
//call
Function.prototype.myCall=function(context,...args){
    if(typeof this!=='function'){
        throw new Error('Error')
    }
    //this指向调用的函数say
    console.log(context)
    //context就是指向的对象 这里是obj2
    context.fn=this
    //let obj2={
    //     name:'lisi',
    //     age:30,
    //     fn:say()
    // }
    const result=context.fn(...args)
    delete context.fn
    return result
}
/**测试用例   myCall使用方法
let obj={
    name:'zhangsan',
    age:20,
    say(){
        console.log(this.name,this.age)
    },
    hello(){
        console.log(this.name,this.age)
    }
}
let obj2={
    name:'lisi',
    age:30
}
obj.say.myCall(obj2)
*/


//apply
Function.prototype.myApply=function (context,arr){
    if(typeof this!=='function'){
        throw new Error('Error')
    }
    context.fn=this
    let result
    if(arr===undefined) {
        result=context.fn()
    }else if (typeof arr!=='object' || !Array.isArray(arr)){
        throw new Error('is not Array')
    }else {
        const args=Array.from(arr)
        result=context.fn(...args)
    }
    delete context.fn
    return result
}
/** 测试用例 let obj={
    name:'zhangsan',
    age:20,
    say(a,b,c){
        console.log(a)
        console.log(b)
        console.log(c)
        console.log(this.name,this.age)
    },
    hello(){
        console.log(this.name,this.age)
    }
}
let obj2={
    name:'lisi',
    age:30
}
obj.say.myApply(obj2,[1,2,3])
*/

// bind
// return ()=>this.call(obj,...args,...rest)


Function.prototype.myBind=function (obj,...args){
    return (...rest)=> {
        console.log(...rest)
        this.call(obj, ...args, ...rest)
    }
}

/**
 * function greet(greeting, punctuation) {
 *     console.log(`${greeting}, ${this.name}${punctuation}`);
 * }
 *
 * const person = { name: "Alice" };
 *
 * // 使用 fakeBind：预置参数为 "Hello"，绑定 this 为 person
 * const boundGreet = greet.myBind(person, "Hello");
 *
 * // 调用 boundGreet，传入参数 "!"
 * boundGreet("!"); // 输出：Hello, Alice!
 *
 */













