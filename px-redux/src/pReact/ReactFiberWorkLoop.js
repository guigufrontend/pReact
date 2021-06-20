import { updateFuntionComponent, updateHostComponent, updateClassComponent, updateFragmentComponent } from "./ReactFiberReconciler";
import { scheduleCallback, shouldYield } from "./schedule";
import { isStr, isFun, isStringOrNumber, Placement, Update, updateNode, Deletion } from "./utils";

let wipRoot = null;
// 将要更新的下一个fiber节点
let nextUnitOfWork = null
// 处理更新
export function scheduleUpdateOnfiber(fiber){
    wipRoot = fiber
    wipRoot.sibling = null
    wipRoot.alternate = {...fiber}
    nextUnitOfWork = wipRoot

    // 调度更新
    scheduleCallback(workLoop)
}

// 执行更新
function performUnitOfWork(wip){
    // 更新自己
    // 注意这里wip fiber节点还没有child、stateNode、 sibling等属性
    // 各种update方法会生成本wip的真实dom放在fiber上
    // 还会找到子节点数组，构建fiber链表结构
    // 类组件和函数式组件没有stateNode
    // 他们的真实节点就是返回值或render函数的返回值， 作为他们自己的child
    // 普通节点的真实dom放在stateNode上
    const {type} = wip
    if(isFun(type)){
        type.prototype.isReactComponent?updateClassComponent(wip):updateFuntionComponent(wip)
    }else if(isStringOrNumber(type)){
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

// function workLoop(IdleDeadline){
function workLoop(){
    // while(nextUnitOfWork && IdleDeadline.timeRemaining()>0){
    //     // 构建fiber节点
    //     nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // }
    while(nextUnitOfWork && !shouldYield()){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    if(!nextUnitOfWork&&wipRoot){
        commitRoot();
    }
}

// window提供的方法， 查看浏览器有没有空闲时间
// 它将在浏览器的空闲时段内调用的函数排队
// 它只在浏览器生效， 所以react提供了自己的实现
// 实现在schedule中
// requestIdleCallback(workLoop)

function commitRoot(){
    // 提交就是把生产的节点挂在到真实dom上
    // 判断是否是函数组件， 函数组件需要把函数体也提交， 用来执行函数体内的hook
    if(isFun(wipRoot.type)){
        commitWorker(wipRoot)
    }else{
        commitWorker(wipRoot.child)
    }
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
    const { stateNode, flags,  type, deletions } = fiber
    if(isFun(type)){
        invokeHooks(fiber)
    }
    // 第一次执行时parentnode就是container
    let parentNode = getParentNode(fiber)
    if(flags&Placement&&stateNode){
        // parentNode.appendChild(stateNode)
        let hasSiblingNode = foundSiblingNode(fiber, parentNode)
        // 往前插入
        if(hasSiblingNode){
            parentNode.insertBefore(stateNode, hasSiblingNode)
        }else{
            // 往后插入
            parentNode.appendChild(fiber.stateNode)
        }
    }
    if(flags&Update&&stateNode){
        updateNode(stateNode, fiber.alternate.props, fiber.props)
    }
    if(deletions){
        commitDeletions( deletions, stateNode||parentNode)
    }
    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}

function invokeHooks(wip){
    const { updateQueueOfLayout, updateQueueOfEffect } = wip
    for(let i=0; i< updateQueueOfLayout.length; i++){
        const effect = updateQueueOfLayout[i]
            const {create} = effect
            create()
    }
    for(let i=0; i< updateQueueOfEffect.length; i++){
        const effect = updateQueueOfEffect[i]
        scheduleCallback(()=>{
            const {create} = effect
            create()
        })
       
    }
}

function commitDeletions(deletions, parentNode) {
    for(let i=0; i< deletions.length; i++){
        const del = deletions[i]
        const child = getStateNode(del)
        parentNode.removeChild(child)
    }
    
}

// 找子dom节点
function getStateNode(fiber) {
    let tem = fiber;
    while(!tem.stateNode){
        tem = tem.child
    }
    return tem.stateNode
}

function foundSiblingNode(fiber, parentNode){
    let siblingHasNode = fiber.sibling
    let node = null
    while(siblingHasNode){
        node = siblingHasNode.stateNode
        if(node && parentNode.contains(node)){
            return node
        }
        siblingHasNode = siblingHasNode.sibling
    }
    return null
}