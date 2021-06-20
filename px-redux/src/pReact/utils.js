

// 为什么是二进制
// 因为节点可能即插入又更新，所以可以位运算组合
// 位运算速度极快
export const NoFlags = 0b00000000000000000000; 
export const Placement = 0b00000000000000000010; 

export const Update = 0b00000000000000000100; 

export const Deletion = 0b00000000000000001000; 
export const Passive = /*                      */ 0b0000000000010000000000;

// ! HookFlags
export const HookLayout = /*    */ 0b010;
export const HookPassive = /*   */ 0b100;

export function isStr(s){
    return typeof s === 'string'
}
export function isFun(s){
    return typeof s === 'function'
}
export function isStringOrNumber(s){
    return typeof s ==='string' || typeof s === 'number'
}
export function updateNode(node, preVal, nextVal){
    Object.keys(preVal).forEach(k=>{
        if(k === 'children'){
            if( isStringOrNumber(preVal.children) ){
                node.textContent = ''
            }
        }else if(k.slice(0, 2) == 'on'){
            const eventName = k.slice(2).toLocaleLowerCase();
            node.removeEventListener(eventName, preVal[k])
        }else{
            node[k] = preVal[k]
        }
        
    })
    Object.keys(nextVal).forEach(k=>{
        if(k === 'children'){
            if( isStringOrNumber(nextVal.children) ){
                node.textContent = nextVal[k] + ""
            }
        }else if(k.slice(0, 2) == 'on'){
            const eventName = k.slice(2).toLocaleLowerCase();
            node.addEventListener(eventName, nextVal[k])
        }else{
            node[k] = nextVal[k]
        }
        
    })
}