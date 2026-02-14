let num = 134131


// function handle(num) {
//     let s = num.toString();
//     let count = 0
//     let result = ''
//     for (let i = s.length - 1; i >= 0; i--) {
//         result = s[i] + result
//         count++
//         if (count % 3 == 0 && i !== 0) {
//             result = ',' + result
//         }
//     }
//     return result
// }
// console.log(handleToIntl(num))
// console.log(handle(num))

function handle(sum) {
    let num = sum.toString()
    let result = ''
    let total = 0

    // 从右向左遍历
    for (let i = num.length - 1; i >= 0; i--) {
        result = num[i] + result
        total++
        // 每3位且不是最左边时加逗号
        if (total % 3 === 0 && i !== 0) {
            result = ',' + result
        }
    }
    return result
}


console.log(handle(141))



