/**
 * 方法1 new Set() 或者使用Array.form()
 * 缺点：无法处理对象类型（如 [ {a:1}, {a:1} ] 会被视为不同元素）
 */

function uniqueArr(arr) {
    return [...new Set(arr)]
    //return Array.from(new Set(arr))
}

/**
 * 方法2 使用filter
 */
function uniqueArr(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

/**
 * 方法3 reduce
 */
function uniqueArr(arr) {
    arr.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur];
    }, []);
}