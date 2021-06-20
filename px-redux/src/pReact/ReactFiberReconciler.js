import { renderHooks } from "./hooks"
import { reconcileChildren } from "./ReactChildFiber"
import { updateNode } from "./utils"

export function updateHostComponent(wip){
    if(!wip.stateNode){
        wip.stateNode = document.createElement(wip.type)
        updateNode(wip.stateNode, {}, wip.props)
    }
    reconcileChildren(wip, wip.props.children)
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

