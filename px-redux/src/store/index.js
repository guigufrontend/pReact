import {  createStore, combineReducers } from 'redux'


export const counterReducer = (state = 0, action)=>{
    const payload = action.payload || 1
    switch (action.type){
        case 'ADD' :
            return state + payload
        case "MINUS":
            return  state - payload
        default:
            return state
    }
}
const store = createStore(combineReducers({count:counterReducer}))
export default store
