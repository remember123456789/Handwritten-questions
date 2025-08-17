//vue2的响应式源码就是基于观察者模式实现的 

//1,实现observer
//先判断是否是一个对象，如果是对象遍历这个对象 通过defineReactive
function observer(target) {
    if (target && typeof target === 'object') {
        Object.keys(target).forEach((key) => {
            defineReactive(target, key, target[key])
        })
    }
}
function defineReactive(target, key, val) {
    //属性值可能是object  需要进行递归
    const dep = new Dep()
    observer(val)
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            return val
        },

        set: function (value) {
            dep.notify()
        }
    })
}
//实现订阅者
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(subs) {
        this.subs.push(subs)
    }

    notify() {
        this.subs.forEach((item) => {
            item.update()
        })
    }
}







