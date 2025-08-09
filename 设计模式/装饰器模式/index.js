//装饰器模式 
// 对象的装饰器模式是一种在不改变对象的基本结构的情况下,动态地给对象添加新的行为的方法。
// 定义打开按钮
class OpenButton {
    // 点击后展示弹窗（旧逻辑）
    onClick() {
        const modal = new Modal()
        modal.style.display = 'block'
    }
}

// 定义按钮对应的装饰器
class Decorator {
    constructor(openButton) {
        this.openButton = openButton
    }

    onClick() {
        this.openButton.onClick()
        this.changeButtonStatus()
    }

    changeButtonStatus() {
        this.changeButtonText()
        this.disableButton()
    }

    disableButton() {
        const btn = document.getElementById('open')
        btn.setAttribute("disabled", true)
    }

    changeButtonText() {
        const btn = document.getElementById('open')
        btn.innerText = '快去登录'
    }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)
document.getElementById('open').addEventListener('click', function () {
    // openButton.onClick()
    // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
    decorator.onClick()
})
export default Decorator
