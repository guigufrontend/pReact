import React, { useReducer } from 'react';
import {counterReducer} from '../store'
export default ()=>{
    const [count ,dispatch] = useReducer(counterReducer, 0)

    return <div>
        <h3>reduxHookPage</h3>
        {count}
        <button onClick={()=>{dispatch({type:'ADD', payload: 100})}}>add</button>
    </div>
}