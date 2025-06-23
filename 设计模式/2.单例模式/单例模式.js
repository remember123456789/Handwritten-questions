/**
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点
 */

// class SingleDog {
//     show() {
//         console.log('我是一个单例对象')
//     }
// }
// const s1 = new SingleDog()
// const s2 = new SingleDog()
// false
// s1 === s2
//首先s1和s2没有任何瓜葛
//因为 他们是独立的对象 各占用一块内存地址
//单例模式希望 不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例
// 单例模式的定义应该是一个构造器返回有且只有同一个实例的模式！
class SingleDog {
    show() {
        console.log('我是一个单例对象')
    }
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!SingleDog.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            SingleDog.instance = new SingleDog()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return SingleDog.instance
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()
s1 === s2  //true
//vuex Store源码
class Store {
    constructor(options = {}) {
        this._actions = Object.create(null)
        this._mutations = Object.create(null)
        this._wrappedGetters = Object.create(null)
        this._modulesNamespaceMap = Object.create(null)
        this._subscribers = []
        this._watcherVM = new Vue()

        // 将 this 赋值给 store，这是为了在后续的函数中使用 Store 实例的上下文
        const store = this
        // 将 this 中的 dispatch 和 commit 方法解构出来，以便在后续的函数中使用
        const { dispatch, commit } = this
        // 分别为 dispatch 和 commit 方法绑定上下文
        this.dispatch = function boundDispatch(type, payload) {
            return dispatch.call(store, type, payload)
        }
        this.commit = function boundCommit(type, payload, options) {
            return commit.call(store, type, payload, options)
        }
    }
}
// 也就是说，vuexInit()的主要作用是将根组件的Store实例注入到子组件中，
// 这样所有子组件都可以通过this.$store访问到同一个 Store 实例。
// 这就确保了 Vuex Store 在整个 Vue 应用中的唯一性。
function vuexInit() {
    const options = this.$options
    // 将 store 实例挂载到 Vue 实例上
    if (options.store) {
        this.$store = typeof options.store === 'function'
            ? options.store()
            : options.store
    } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store
    }
}
// 总结一下：install()函数通过拦截 Vue.use(Vuex) 的多次调用，保证了在同一个Vue应用只会安装唯一的一个Vuex实例；
// 而 vuexInit() 函数则保证了同一个Vue应用只会被挂载唯一一个Store。这样一来，从效果上来看，Vuex 确实是创造了两个”单例“出来。


// 在同一个 Vue 应用中，只会存在一个 Store 实例，但在多个 Vue 应用中，可以存在多个 Store 实例。
// 在不同的 Vue 应用中，当我们想共享唯一的一个 Store 时，仍然需要通过在全局范围内使用单例模式来确保 Store 的唯一性。