export function isStr(s){
    return typeof s === 'string'
}
export function isFun(s){
    return typeof s === 'function'
}
export function updateNode(node, nextVal){
    Object.keys(nextVal).forEach(k=>{
        if(k === 'children'){
            if( isStr(nextVal.children) ){
                node.textContent = nextVal[k]
            }
        }else{
            node[k] = nextVal[k]
        }
        
    })
}