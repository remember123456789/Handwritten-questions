// 浅拷贝
// function shallowCopy(obj) {
//     // 判断是否为对象，如果不是就不进行拷贝
//     if (typeof obj !== 'object') {
//         return
//     }
//     //obj可能为数组可能为对象
//     let result = obj instanceof Array ? [] : {}
//     // 递归拷贝
//     for(let key in obj){
//         if(obj.hasOwnProperty(key)){
//             result[key]=obj[key]
//         }
//     }
//     return result
// }

// // 浅拷贝只复制对象的第一层属性，如果属性值是对象或数组，则只复制引用。
// let obj={
//     name:'zs',
//     age:18,
//     info:{
//         address:'北京'
//     }
// }


// let newObj=shallowCopy(obj)

// obj.name='lisi'
// newObj.info.address='上海'
// console.log(obj,'obj');
// console.log(newObj,'newObj');

// 深拷贝
// 多了一个递归的操作

function deepCopy(obj) {
    if (typeof obj !== 'object') {
        return
    }

    let result = obj instanceof Array ? [] : {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return result
}

let obj = {
    name: 'zs',
    age: 18,
    info: {
        address: '北京'
    }
}

let newObj = deepCopy(obj)

obj.name = 'lisi'
newObj.info.address = '上海'

console.log(obj, 'obj');
console.log(newObj, 'newObj');

// 深拷贝的会创建一个新对象，两个对象是不同的存储地址，修改一个对象属性，不会影响到另一个对象属性的变化
// { name: 'lisi', age: 18, info: { address: '北京' } } obj
// { name: 'zs', age: 18, info: { address: '上海' } } newObj 