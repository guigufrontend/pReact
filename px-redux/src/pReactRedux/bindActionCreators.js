export function bindActionCreators(creators, dispatch){
    const dispatchActions = {}
    Object.keys(creators).map(key=>{
        const action = creators[key]
        dispatchActions[key] = (...arg)=>{
            dispatch(action(...arg))
        }
    })
    return dispatchActions
}