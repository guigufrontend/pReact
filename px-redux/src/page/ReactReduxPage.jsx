import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import {bindActionCreators} from '../pReactRedux/bindActionCreators'
import { connect } from '../pReactRedux'

@connect(
    ({count})=>({count}),
    // {
    //     add: ()=>({type:'ADD'}),
    //     minus:()=>({type:"MINUS"})
    // }
    (dispatch)=>{
        // const actions = {
        //         add: ()=>dispatch({type:'ADD'}),
        //         minus:()=>dispatch({type:"MINUS"})
        // }
        let actions = {
            add: ()=>({type:'ADD'}),
            minus:()=>({type:"MINUS"})
        }
        actions = bindActionCreators(actions, dispatch) 
        return {...actions, dispatch}
    }
)
class ReactReduxPage extends Component {
    render(){
        const {count, dispatch, add, minus } = this.props
        console.log( this.props)
        return (
            <div>
                <h3>ReactReduxPage</h3>
                <p>{count}</p>
                <button onClick={()=>dispatch({type:'ADD'})}>add</button>
                <button onClick={()=>add()}>mappropsadd</button>
                <button onClick={()=>minus()}>minus</button>

            </div>
        )
    }
}

export default ReactReduxPage