import { NoFlags, Placement } from "./utils"

export function createFiber(vnode, reutrnFiber){
    const fiber = {
        type: vnode.type,
        key:vnode.key,
        props:vnode.props,
        stateNode:null, // 原生标签指dom接地那，类组件指的是实例
        child:null,
        sibling:null,
        return: reutrnFiber,
        // 标记节点更新方式
        flags: Placement,
        // 老节点
        alternate: null,
        deletions: null, // 要删除的子节点
        index: null, // 当前层级下的位置/下标
    }
    return fiber
}