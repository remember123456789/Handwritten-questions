//实现flatMap函数  数组扁平化
const flatMap = (arr) => {
    let list = []

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            list = list.concat(flatMap(arr[i]))
        } else {
            list.push(arr[i])
        }
    }
    return list
}

//测试用例
flatMap([1, 2, 4, [2, 1, [2]]]); //[ 1, 2, 4, 2, 1, 2 ]

flatMap([1, 2, 3, [2, 1]])//[ 1, 2, 3, 2, 1 ]