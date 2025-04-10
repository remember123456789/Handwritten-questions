/**
 * 封装Ajax 
 * 请求方式
 * ajax({
    type: 'post',
    dataType: 'json',
    data: {},
    url: 'https://xxxx',
    success: function(text,xml){//请求成功后的回调函数
        console.log(text)
    },
    fail: function(status){////请求失败后的回调函数
        console.log(status)
    }
})
 */
function ajax(option) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        option = option || {}
        option.type = (option.type || 'GET').toUpperCase()
        option.dataType = option.dataType || 'json'
        const params = option.data


        if (option.type === 'GET') {
            xhr.open('GET', option.url + '?' + params, true)
            xhr.send(null)
        } else if (option.type === 'POST') {
            xhr.open('POST', option.url, true)
            xhr.send(params)
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText)
                } else {
                    reject(xhr.response)
                }
            }
        }
    })

}