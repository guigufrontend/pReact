export default function compose(...funs){
    if(funs.length === 0){
        return arg=>arg
    }
    if(funs.length===1){
        return funs[0]
    }
    return  funs.reduce((a, b)=>{
        return (...args)=>{
            return a(b(...args))
        }
    })
}
// function f1(f1){
//     console.log('f1', f1)
//     return f1
// }
// function f2(f2){
//     console.log('f2', f2)
//     return f2
// }
// function f3(f3){
//     console.log('f3', f3)
//     return f3
// }
// compose(f1, f2, f3)(1234)
