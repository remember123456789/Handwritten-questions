let arr=[1,2,3,[1,2,3,[2,3]],[2]]

function flat(arr){
    let result=[]

    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            result=result.concat(flat(arr[i]))
        }else{
            result.push(arr[i])
        }

    }
    return result
}

let newarr=flat(arr)
console.log(newarr)