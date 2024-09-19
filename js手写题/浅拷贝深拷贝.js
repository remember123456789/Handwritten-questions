// 浅拷贝
function shallowCopy(obj) {
    // 判断是否为对象，如果不是就不进行拷贝
    if (typeof obj !== 'object') {
        return
    }
    //obj可能为数组可能为对象
    let result = obj instanceof Array ? [] : {}
    // 递归拷贝
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            result[key]=obj[key]
        }
    }
    return result
}

// 浅拷贝只复制对象的第一层属性，如果属性值是对象或数组，则只复制引用。
let obj={
    name:'zs',
    age:18,
    info:{
        address:'北京'
    }
}


let newObj=shallowCopy(obj)

obj.name='lisi'
newObj.info.address='上海'
console.log(obj,'obj');
console.log(newObj,'newObj');