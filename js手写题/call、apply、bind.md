### call、apply、bind

```js
@param {apply} param - 第二个参数只接受一个数组
function fn(...args) {
console.log(this, args);
}
let obj = {
myname: "张三"
}

fn.apply(obj, [1, 2]); // this 会变成传入的 obj，传入的参数必须是一个数组；
fn(1, 2) // this 指向 window
```

bind

```js
-function fn(...args) {
  console.log(this, args);
};
let obj = {
  myname: "张三",
};

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1, 2); // this指向obj
fn(1, 2); // this指向window
```

从上面可以看到，apply、call、bind 三者的区别在于：

三者都可以改变函数的 this 对象指向
三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window
三者都可以传参，但是 apply 是数组，而 call 是参数列表，且 apply 和 call 是一次性传入参数，而 bind 可以分为多次传入
bind 是返回绑定 this 之后的函数，apply、call 则是立即执行
