
// 给一个url 要求判断是否合法，用Boolean值返回
// 协议仅为https

function isUrl(url){
    const regx=/^(http:\/\/)+[a-z]/

    return regx.test(url)
}

let result="http://example.com"

console.log(isUrl(result));



