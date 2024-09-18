export class TrafficLight {
  constructor(lights) {
    this._lights = lights;
    this.time = new Date();
    this.currentIndex = 1;
  }
  _update() {
    //获取经过了多少时间
    let disTime = (new Date() - this.time) / 1000;
    const total = this._lights.reduce((pre, cur) => pre + cur.time, 0);
    //如果回到原点，还需要去更新最新的时间
    this.time = total * Math.floor(disTime/total)*1000;
    //如果灯运算结果真好为0  那就是回到原点
    //求余数 如果灯运算结果真好为0  那就是回到原点
    disTime = disTime %total

    //循环切换灯
    while(1){
        disTime-=this._lights[this.currentIndex].time
        if(disTime<=0) break;
        else{
            this.time+=this._lights[this.currentIndex].time *1000
            this.currentIndex=(this.currentIndex+1)%(this._lights.length)
        }
    }
  }

  getCurrentLight() {
    //更新最新灯的状态
    this._update();

    return {
      color: this._lights[this.currentIndex].color,
      //剩余时间
      //用总的时间减去切换适合的时间=剩余时间
      remine:
        this._lights[this.currentIndex].time - (new Date() - this.time) / 1000,
    };
  }
}
