import { updateFuntionComponent, updateHostComponent, updateClassComponent, updateFragmentComponent } from "./ReactFiberReconciler";
import { isStr, isFun } from "./utils";

let wipRoot = null;
// 将要更新的下一个fiber节点
let nextUnitOfWork = null
// 处理更新
export function scheduleUpdateOnfiber(fiber){
    wipRoot = fiber
    wipRoot.sibling = null
    nextUnitOfWork = wipRoot
}

// 执行更新
function performUnitOfWork(wip){
    // 更新自己
    const {type} = wip
    if(isFun(type)){
        type.prototype.isReactComponent?updateClassComponent(wip):updateFuntionComponent(wip)
    }else if(isStr(type)){
        updateHostComponent(wip)
    }else{
        updateFragmentComponent(wip)
    }  
    // 返回下一个节点
    // 深度优先遍历
    if(wip.child){
        return wip.child
    }
    let next = wip
    while(next){
        if(next.sibling){
            return next.sibling
        }
        next = next.return
    }
    return null
}

function workLoop(IdleDeadline){
    while(nextUnitOfWork && IdleDeadline.timeRemaining()>0){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    if(!nextUnitOfWork&&wipRoot){
        commitRoot();
    }
}
requestIdleCallback(workLoop)

function commitRoot(){
    commitWorker(wipRoot.child)
}

function getParentNode(fiber){
    let next = fiber.return;
    while(!next.stateNode){
        next = next.return
    }
    return next.stateNode
}
function commitWorker(fiber){
    if(!fiber){
        return;
    }
    const { stateNode } = fiber
    let parentNode = getParentNode(fiber)
    if(stateNode){
        parentNode.appendChild(stateNode)
    }
    
    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}