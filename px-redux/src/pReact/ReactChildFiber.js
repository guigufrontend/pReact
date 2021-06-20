import { createFiber } from "./fiber"
import { Deletion, isStringOrNumber, Placement, Update } from "./utils"

export function reconcileChildren(reutrnFiber, children){
    if(isStringOrNumber(children)){
        return
    }
    const shouldTrackSideEffects = !!(reutrnFiber.alternate)
    const newChildren = Array.isArray(children)?children:[children]
    let previouseNewFiber = null
    let oldFiber = reutrnFiber.alternate && reutrnFiber.alternate.child
    
    let nextOldFiber = null
    let newIndex = 0;
    let lastPlacedIndex = 0

    // 找能复用的节点， 只要相对位置没有发生变化，就继续往后复用，否则跳出循环
    for(; oldFiber&&newIndex<newChildren.length; newIndex++){
        const newChild = newChildren[newIndex]
        if(newChild == null){
            continue
        }
        if(oldFiber.index>newIndex){
            nextOldFiber = oldFiber
            oldFiber = null
        }else{
            nextOldFiber = oldFiber.sibling
        }
        const same = sameNode(newChild, oldFiber)

        if(!same ){
            if(oldFiber === null){
                oldFiber = nextOldFiber
            }
            break
        }

        const newFiber = createFiber(newChild, reutrnFiber)
        Object.assign(newFiber,{
            alternate: oldFiber,
            stateNode: oldFiber.stateNode,
            flags:Update
        })
        
        lastPlacedIndex = placeChild(
            newFiber,
            lastPlacedIndex,
            newIndex,
            shouldTrackSideEffects
        )
        if(previouseNewFiber===null){
            reutrnFiber.child = newFiber
        }else{
            previouseNewFiber.sibling = newFiber
        }
        previouseNewFiber = newFiber
        oldFiber = nextOldFiber
    }
    // 新children已经遍历完， 其他几点旧节点删除
    if(newChildren.length<=newIndex){
        deleteRemainingChildren(reutrnFiber, oldFiber)
        return
    }
    // oldFiber没了， newChildren还有
    if(!oldFiber){
        // 初次渲染
        for(; newIndex<newChildren.length; newIndex++){
            const newChild = newChildren[newIndex]
            if(newChild == null){
                continue
            }
            const newFiber = createFiber(newChild, reutrnFiber)
            
            lastPlacedIndex = placeChild(
                newFiber,
                lastPlacedIndex,
                newIndex,
                shouldTrackSideEffects
            )
            if(previouseNewFiber===null){
                reutrnFiber.child = newFiber
            }else{
                previouseNewFiber.sibling = newFiber
            }
            previouseNewFiber = newFiber
        }
        return
    }
  
   // 
   const existingChildren = mapRemainingChildren(oldFiber)
   for(; newIndex<newChildren.length;newIndex++){
    const newChild = newChildren[newIndex]
    if(newChild === null){
        continue
    }
    const newFiber = createFiber(newChild, reutrnFiber)
    lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        newIndex,
        shouldTrackSideEffects
    )
    let matchedFiber = existingChildren.get(newFiber.key||newFiber.index)
    if(matchedFiber){
        existingChildren.delete(newFiber.key||newFiber.index)
        Object.assign(newFiber,{
            alternate: matchedFiber,
            stateNode:matchedFiber.stateNode,
            flags:Update,
        })
    }
    if(previouseNewFiber === null){
        reutrnFiber = newFiber
    }else{
        previouseNewFiber.sibling = newFiber
    }
    previouseNewFiber = newFiber
   }

   if(shouldTrackSideEffects){
    existingChildren.forEach(each=>deleteChild(reutrnFiber,each))
   }
}

// 判断同一个节点，服用
// 调用前提是同一个层级下
function sameNode(a,b) {
    return !!(a&&b&&a.key===b.key&&a.type===b.type)
}

function deleteChild(reutrnFiber, childToDelete) {
    childToDelete.flags = Deletion
    if(reutrnFiber.deletions){
        reutrnFiber.deletions.push(childToDelete)
    }else{
        reutrnFiber.deletions = [childToDelete]
    }
}

// 删除某个节点的所有后续兄弟节点
function deleteRemainingChildren(reutrnFiber, currentFirstChild){
    let childToDelete = currentFirstChild;
    while(childToDelete){
        deleteChild(reutrnFiber, childToDelete)
        childToDelete = childToDelete.sibling
    }
}
function placeChild(
    newFiber,
    lastPlacedIndex,
    newIndex,
    shouldTrackSideEffects // 是不是初次渲染
) {
    newFiber.index = newIndex
    if(!shouldTrackSideEffects){
        return lastPlacedIndex
    }
    const current = newFiber.alternate
    if(current){
        const oldIndex = current.index
        if(oldIndex < lastPlacedIndex){
            newFiber.flags = Placement
            return lastPlacedIndex
        }else{
            return oldIndex
        }
    }else{
        newFiber.flags = Placement
        return lastPlacedIndex
    }
}
// 链表转map
function mapRemainingChildren(currentFirstChild){
    const existingChildren = new Map()
    let existingChild = currentFirstChild
    while(existingChild){
        existingChildren.set(
            existingChild.key||existingChild.index,
            existingChild
        )
        existingChild = existingChild.sibling
    }
    return existingChildren
}