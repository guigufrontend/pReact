import { scheduleUpdateOnfiber } from "./ReactFiberWorkLoop"

let currentReduceringFiber = null
let workInProgressHook = null
export function useReducer(reducer, initState) {
    const hook = updateWorkInProgressHook()
    if(!currentReduceringFiber.alternate){
        hook.memoizedState = initState
    }
    const dispatch = (action) =>{
        hook.memoizedState = reducer(hook.memoizedState, action)
        scheduleUpdateOnfiber(currentReduceringFiber)
    }
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
        }else{
            // 第0个hook
            hook = workInProgressHook = current.memoizedState;
        }
    }else{
        hook = {
            memoizedState:null,
            next: null
        }
        // 初次渲染
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
    workInProgressHook = null;
}