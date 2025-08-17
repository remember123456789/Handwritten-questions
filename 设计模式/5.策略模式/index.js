// 定义一个询价处理器对象
//通过对象映射来管理询价 后续需要新增新的询价 只需要在priceProcessor添加就好了
// 定义一系列的算法, 把它们一个个封装起来, 并且使它们可相互替换。

const priceProcessor = {
    pre(originPrice) {
        if (originPrice >= 100) {
            return originPrice - 20;
        }
        return originPrice * 0.9;
    },
    onSale(originPrice) {
        if (originPrice >= 100) {
            return originPrice - 30;
        }
        return originPrice * 0.8;
    },
    back(originPrice) {
        if (originPrice >= 200) {
            return originPrice - 50;
        }
        return originPrice;
    },
    fresh(originPrice) {
        return originPrice * 0.5;
    },
}
// 询价函数
function askPrice(tag, originPrice) {
    return priceProcessor[tag](originPrice)
}




