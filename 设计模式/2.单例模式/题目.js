//1.实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。

class Storage {
    constructor() {

    }

    static getInstrance() {
        if (!Storage.instrance) {
            Storage.instrance = new Storage()
        }
        return Storage.instrance
    }

    static setItem(key, value) {

        localStorage.setItem(key, value)
    }
    static getItem(key) {
        return localStorage.getItem(key)
    }
}





