//promise.map，限制 promise 并发数
//测试用例
pMap([1, 2, 3, 4, 5], (x) => Promise.resolve(x + 1));
pMap([Promise.resolve(1), Promise.resolve(2)], (x) => x + 1);
// 注意输出时间控制
pMap([1, 1, 1, 1, 1, 1, 1, 1], (x) => sleep(1000), { concurrency: 2 });

/*
    @params {concurrency} 最大并发数
*/

//实现
function pMap(list, mapper, concurrency = Infinity) {
    // list 为 Iterator，先转化为 Array
    list = Array.from(list);

    return new Promise((resolve, reject) => {
        let currentIndex = 0;
        let result = [];
        let resolveCount = 0;
        let len = list.length;
        function next() {
            const index = currentIndex;
            currentIndex++;
            Promise.resolve(list[index])
                .then((o) => mapper(o, index))
                .then((o) => {
                    result[index] = o;
                    resolveCount++;

                    //检测所有任务是否完成
                    if (resolveCount === len) {
                        resolve(result);
                    }
                    if (currentIndex < len) {
                        next();
                    }
                })
        }
        for (let i = 0; i < concurrency && i < len; i++) {
            next();
        }
    })
}