import React from 'react';
import { useSelector, useDispatch } from '../pReactRedux'

export default()=>{
    const count = useSelector(({count})=>count)
     const dispatch = useDispatch()
    return <div>
        <h3>reduxHookPage</h3>
        {count}
        <button onClick={()=>dispatch({type:'ADD'})}>add</button>
        {/* <button onClick={()=>add()}>mappropsadd</button>
        <button onClick={()=>minus()}>minus</button> */}
    </div>
}