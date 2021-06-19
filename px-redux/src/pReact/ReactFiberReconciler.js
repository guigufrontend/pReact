import { createFiber } from "./fiber"
import { renderHooks } from "./hooks"
import { isStr, isStringOrNumber, Update, updateNode } from "./utils"

export function updateHostComponent(wip){
    if(!wip.stateNode){
        wip.stateNode = document.createElement(wip.type)
        updateNode(wip.stateNode, {}, wip.props)
    }
    reconcileChildren(wip, wip.props.children)
}
function reconcileChildren(reutrnFiber, children){
    if(isStringOrNumber(children)){
        return
    }
    const newChildren = Array.isArray(children)?children:[children]
    let previouseNewFiber = null
    let oldFiber = reutrnFiber.alternate && reutrnFiber.alternate.child
    for(let i = 0; i<newChildren.length; i++){
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, reutrnFiber)

        const same = sameNode(oldFiber, newFiber)
        if(same){
            // 更新
            Object.assign(newFiber, {
                alternate: oldFiber,
                stateNode: oldFiber.stateNode,
                flags:Update
            })
        }

        if(oldFiber){
            oldFiber = oldFiber.sibling;
        }

        if(previouseNewFiber===null){
            reutrnFiber.child = newFiber
        }else{
            previouseNewFiber.sibling = newFiber
        }
        previouseNewFiber = newFiber
    }
   
}
export function updateFuntionComponent(wip){
    renderHooks(wip)
    const {type, props} = wip
    const children = type(props)
    reconcileChildren(wip, children) 
}
export function updateClassComponent(wip) {
    const {type, props} = wip
    const instance = new type(props)
    const child = instance.render()
    reconcileChildren(wip, child) 
}
export function updateFragmentComponent(wip) {
    reconcileChildren(wip, wip.props.children) 
}

// 判断同一个节点，服用
// 调用前提是同一个层级下
function sameNode(a,b) {
    return !!(a&&b&&a.key===b.key&&a.type===b.type)
}