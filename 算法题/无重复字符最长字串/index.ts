function lengthOfLongestSubstring(s) {
    let arr = new Set()
    let maxcount = 0
    let left = 0
    for (let right = 0; right < s.length; right++) {
        while (arr.has(s[right])) {
            arr.delete(s[left])
            left++
        }

        arr.add(s[right])
        maxcount = Math.max(maxcount, right - left + 1)
    }
    return maxcount
};
//测试用例
//cb

//思路
//定义两个指针 一个是left一个是rigth
//right遍历字符串 给set中添加字符串 如果说set中已经存在了 就删除s[left] 第一次就是删除第一个
//s = "abcabcbb"
// abc --->a   ----> bca--->b --->cab --->c



