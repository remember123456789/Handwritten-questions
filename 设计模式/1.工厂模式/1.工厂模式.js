/**
 * 1.工厂模式就是对创建对象的过程进行单独封装
 */
//当前这个对象中有4个属性，但是work属性是动态的，根据它的career的不同职业工作内容不同
function User(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}
//我们创建一个工厂函数  在内容进行判断然后创建User实例
function Factory(name, age, career) {
    let work;
    switch (career) {
        case 'coder':
            work = '写代码';
            break;
        case 'designer':
            work = '设计';
            break;
        case 'manager':
            work = '管理';
            break;
    }
    return new User(name, age, career, work);
}


let user = Factory('小明', 18, 'designer')
console.log(user.work)