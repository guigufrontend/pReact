import React, {Component} from 'react';
// import store from '../store'
import store from '../pRedux'

export default class ReduxPage extends Component {
    add = ()=>{
        store.dispatch({type:"ADD", payload:100})
    }
    asyAdd = ()=>{
        store.dispatch((dispatch)=>{
            setTimeout(()=>{
                dispatch({type: "ADD", payload:100})
            },2000)
        })
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.forceUpdate()
        })
    }
    render(){
        return <div>
            <h3>ReduxPage</h3>
            <div>{store.getState()}</div>
            <button onClick={()=>this.add()}>add</button>
            <button onClick={()=>this.asyAdd()}>asyAdd</button>
        </div>
    }
}