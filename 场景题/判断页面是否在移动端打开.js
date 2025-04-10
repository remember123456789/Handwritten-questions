

function formatPrice(price) {
    return `￥${Number(price).toFixed(2)}`
}

formatPrice(1234.5) // ￥1234.50
formatPrice(1234.5678) // ￥1234.57