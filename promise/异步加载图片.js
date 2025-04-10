const load = true


const imgLoad = () => {
    let Imgpath = ['', '', '']

    let imgList = Imgpath.map((V, i) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = V
            img.onload = () => {
                resolve(false)
            }
        })
    })
    Promise.all(imgList).then((resolve) => {
        load = false
    })
}

Object.defineProperty.toString.call()