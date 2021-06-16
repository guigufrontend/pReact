
import React, {Component} from 'react';
import { createBrowserHistory } from 'history'
import Router from './Router'

export default class BrowerRouter extends Component{
    constructor(props){
        super(props)
        this.history = createBrowserHistory()
    }
    
    render(){
        const { children } = this.props
        console.log("history" ,this.history)
        return (
            <Router history={this.history} children={children} ></Router>
        )
    }
}