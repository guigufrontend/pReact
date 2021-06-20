import { scheduleUpdateOnfiber } from "./ReactFiberWorkLoop"
import { HookPassive, HookLayout } from "./utils"

let currentReduceringFiber = null
let workInProgressHook = null

// 当前正在工作的hook对应的老hook
let currentHook = null

export function useEffect(create, deps){
    return updateEffectImpl(HookPassive ,create, deps)

}
export function useLayoutEffect(create, deps){
    return updateEffectImpl(HookLayout ,create, deps)
}

export function updateEffectImpl(hookFlag, create, deps){
    const hook = updateWorkInProgressHook()
    const effect = {hookFlag, create, deps}
    // 组件更新 且 依赖项没有发生变化
    if( currentHook ){
        const preEffect = currentHook.memoizedState
        if(deps){
            const preDeps =   preEffect.deps
            if(areHookInputsEqual(preDeps, deps)){
                return;
            }
            
        }
       
    }
    hook.memoizedState = effect;

    if(hookFlag & HookPassive){
        currentReduceringFiber.updateQueueOfEffect.push(effect);

    }else if(hookFlag & HookLayout){
        currentReduceringFiber.updateQueueOfLayout.push(effect);

    }
    // 源码放在链表

}

export function useReducer(reducer, initState) {
    const hook = updateWorkInProgressHook()
    if(!currentReduceringFiber.alternate){
        hook.memoizedState = initState
    }
    const fiber = currentReduceringFiber
    const dispatch = (action) => {
        hook.memoizedState = reducer(hook.memoizedState, action)
        scheduleUpdateOnfiber(fiber)
    }
    // console.log('currentReduceringFiber', fiber)
    return [hook.memoizedState, dispatch]
}

function updateWorkInProgressHook(){
    let hook = null;

    let current = currentReduceringFiber.alternate;
    if(current){
        // 更新
        currentReduceringFiber.memoizedState = current.memoizedState
        if(workInProgressHook){
            // 不是第0个hook
            hook = workInProgressHook =  workInProgressHook.next
            currentHook = currentHook.next
        }else{
            // 第0个hook
            hook = workInProgressHook = current.memoizedState;
            currentHook = current.memoizedState
        }
    }else{
        // 初次渲染
        hook = {
            memoizedState:null,
            next: null
        }
        currentHook= null
        if(workInProgressHook){
            // 不是第0个hook
            workInProgressHook =  workInProgressHook.next = hook
        }else{
            // 第0个hook
            workInProgressHook = currentReduceringFiber.memoizedState = hook;
        }
    }
    return hook;
}

export function renderHooks(fiber) {
    currentReduceringFiber = fiber;
    currentReduceringFiber.memoizedState = null;
    currentReduceringFiber.updateQueueOfLayout= []
    currentReduceringFiber.updateQueueOfEffect= []

    workInProgressHook = null;
}

function areHookInputsEqual(nextDeps, preDeps) {
    if(preDeps === null){
        return false
    }
    for(let i=0; i< preDeps.length&&i<nextDeps.length; i++){
        if(Object.is(nextDeps[i], preDeps[i])){
            continue
        }
        return false
    }
    return true
}