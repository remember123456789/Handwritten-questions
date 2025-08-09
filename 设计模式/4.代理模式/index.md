#### 代理模式

代理模式的定义：为其他对象提供一种代理以控制对这个对象的访问。

分类：

- 事件代理
- 虚拟代理
- 缓存代理
- 保护代理
- 智能引用代理
- 远程代理
- 防火墙代理
- 日志代理
- 调试代理

##### 1.事件代理

事件代理实际上就是事件委托，利用元素的冒泡机制，将事件绑定在父元素上，当子元素触发事件时，会冒泡到父元素上，从而触发事件代理。

事件代理的优势：

- 可以减少事件绑定的次数，提高性能
- 可以动态添加或删除事件绑定，避免内存泄漏

##### 2.虚拟代理

```js
class PreLoadImage {
  constructor(imgNode) {
    // 获取真实的DOM节点
    this.imgNode = imgNode;
  }

  // 操作img节点的src属性
  setSrc(imgUrl) {
    this.imgNode.src = imgUrl;
  }
}

class ProxyImage {
  // 占位图的url地址
  static LOADING_URL = "xxxxxx";

  constructor(targetImage) {
    // 目标Image，即PreLoadImage实例
    this.targetImage = targetImage;
  }

  // 该方法主要操作虚拟Image，完成加载
  setSrc(targetUrl) {
    // 真实img节点初始化时展示的是一个占位图
    this.targetImage.setSrc(ProxyImage.LOADING_URL);
    // 创建一个帮我们加载图片的虚拟Image实例
    const virtualImage = new Image();
    // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
    virtualImage.onload = () => {
      this.targetImage.setSrc(targetUrl);
    };
    // 设置src属性，虚拟Image实例开始加载图片
    virtualImage.src = targetUrl;
  }
}
```

ProxyImage 来完成预加载工作，而 PreLoadImage 来完成图片的展示工作。

这里的 virtualImage 是创建了一个虚拟的 Image 实例，用来帮助我们预加载图片，这种代替真实 DOM 节点的方式，称作为虚拟代理

##### 3.缓存代理

缓存代理的定义：为一个耗时的操作结果提供临时的存储，当请求再次出现时，直接返回缓存中的结果，而不是重新执行操作。

对计算结果进行保存 ，取值时判断对象是否含有这个键值对 如果有就直接返回缓存的值

Array.prototype.join.call(arguments, ",") 这行代码的意思是 argument 是一个类数组 这个类数组本身是没有 join 的方法的，然后通过 call 改变 join 的 this 指向 指向 arguments 然后调用 join 方法 把 arguments 转换为一个字符串

```js
const addAll = function () {
  console.log("进行了一次新计算");
  let result = 0;
  const len = arguments.length;
  for (let i = 0; i < len; i++) {
    result += arguments[i];
  }
  return result;
};

// 为求和方法创建代理
const proxyAddAll = (function () {
  // 求和结果的缓存池
  const resultCache = {};
  return function () {
    // 将入参转化为一个唯一的入参字符串
    const args = Array.prototype.join.call(arguments, ",");

    // 检查本次入参是否有对应的计算结果
    if (args in resultCache) {
      // 如果有，则返回缓存池里现成的结果
      return resultCache[args];
    }
    return (resultCache[args] = addAll(...arguments));
  };
})();
```

##### 4.保护代理

保护代理通过 ES6 中的 Proxy 来实现，就是在访问目标对象之前，添加一层代理，代理层可以对目标对象进行一些限制，比如权限校验、数据校验、缓存等。










