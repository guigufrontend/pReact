// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactDOM from './pReact0/react-dom'
// import Component from './pReact0/Component'
import ReactDOM from './pReact/react-dom'
import Component from './pReact/Component'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Component } from 'react';


function FunctionComponent({name}){
  return <div>
    <p>{name}</p>
  </div>
}
class ClassComponent extends Component{
  render(){
    return <div className='border'>
    <p>{this.props.name}</p>
  </div>
  }
}
function FF(params) {
  return <>
    <li>11</li>
    <li>22</li>
    <li>33</li>
  </>
}
ReactDOM.render(
  <div className='border'>
    <h1>全栈</h1>
    <a href='www.baidu.com'>px</a>
    <FunctionComponent name='function'></FunctionComponent>
    <ClassComponent name='Class'></ClassComponent>
    <FF></FF>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
