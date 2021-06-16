import {  createStore } from './createStore'
// import { applyMiddleware,  } from 'redux'
import { applyMiddleware, thunk, logger } from './createStore'
// import thunk from 'redux-thunk'

const counterReducer = (state = 0, action)=>{
    switch (action.type){
        case 'ADD' :
            return state+action.payload
        case "MINUS":
            return  state - action.payload
        default:
            return state
    }
}
const store = createStore(counterReducer, applyMiddleware(thunk, logger))
 export default store