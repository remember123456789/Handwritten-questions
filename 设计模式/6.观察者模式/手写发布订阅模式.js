//在订阅发布模式中，发布者将事件发送到事件总线或事件管理器中，然后订阅者订阅感兴趣的事件。
// 当事件发生时，事件总线或事件管理器会通知所有订阅了该事件的订阅者，
// 并调用它们预先注册的回调函数，从而实现了一种松耦合的通信方式。
console.log('文件开始执行了！');

class EventEmitter {
    constructor() {
        // handlers是一个map，用于存储事件与回调之间的对应关系
        this.handlers = {}
    }

    //订阅事件
    on(eventName, callback) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = []
        }
        this.handlers[eventName].push(callback)
        console.log(this.handlers);
    }


    //触发事件
    emit(eventName) {
        if (this.handlers[eventName]) {
            const handlers = this.handlers[eventName]

            handlers.forEach(element => {
                element()
            });
        }
    }

    //取消订阅
    off(eventName, cb) {
        const callbacks = this.handlers[eventName]
        let index = callbacks && callbacks.indexOf(cb)
        if (index != -1) {
            callbacks.splice(index, 1)
        }
    }
    //仅仅订阅一次

    once(eventName, cb) {
        if (this.handlers[eventName] && this.handlers[eventName].indexOf(cb)) {
            return
        }
        this.on(eventName, cb)
    }

}


const emitter = new EventEmitter()

emitter.on('change', () => {
    console.log(123)
})



emitter.emit('change')
