import compose from './compose'
function createStore( reducer, enHancer ){
    if(enHancer){
        return enHancer(createStore)(reducer)
    }
    let currentState = undefined
    let currentLisener = []
    function getState(){
        return currentState
    }
    function dispatch(action){
        currentState = reducer(currentState, action)
        currentLisener.forEach(listener=>listener())
    }
    function subscribe(listener){
        currentLisener.push(listener)
        return ()=>{
            const index = currentLisener.indexOf(listener)
            currentLisener.splice(index,1)
        }
    }
    dispatch({type:'REDEX/XXXXXX'})
    return {
        getState,
        dispatch,
        subscribe
    }
}
export function applyMiddleware(...middlewares){
    return (createStore)=>(...reducer)=>{
        const store = createStore(...reducer)
        let dispatch = store.dispatch
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...arg)=>{dispatch(...arg)}
        }
        const chain = middlewares.map((middleware) => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}   

export function thunk({getState, dispatch}){
    return next=>action=>{
        if(typeof action === 'function'){
            return action(dispatch, getState)
        }
        return next(action)
    }
}
export function logger({getState, dispatch}){
    return next=>action=>{
        console.log('type',action.type)
        console.log('prevalue',getState())
        const value = next(action)
        console.log('nextvalue', getState())
        return value
    }
}
export {createStore}