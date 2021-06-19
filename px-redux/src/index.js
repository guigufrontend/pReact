// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactDOM from './pReact0/react-dom'
// import Component from './pReact0/Component'
import ReactDOM from './pReact/react-dom'
import Component from './pReact/Component'
import { useReducer } from './pReact'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Component } from 'react';


function FunctionComponent(props){
  const {name} = props
  // const [count, setCount] = useState()
  const [count2, setCount2] = useReducer((x)=>x+1, 0)
  return <div>
    <p>{name}</p>
    {/* <p>{count}</p>
    <button onClick={()=>{setCount(count+1)}}>clickCount</button> */}
    <p>{count2}</p>
    <button onClick={()=>{setCount2()}}>clickCount2</button>

  </div>
}
function FunctionComponent2(props){
  const {name} = props
  // const [count, setCount] = useState()
  const [count2, setCount2] = useReducer((x)=>x+100, 0)
  return <div>
    <p>{name}</p>
    {/* <p>{count}</p>
    <button onClick={()=>{setCount(count+1)}}>clickCount</button> */}
    <p>{count2}</p>
    <button onClick={()=>{setCount2()}}>clickCount2</button>

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
    {/* <h1>全栈</h1>
    <a href='www.baidu.com'>px</a> */}
    <FunctionComponent name='function'></FunctionComponent>
    <FunctionComponent2 name='function2'></FunctionComponent2>

    {/* <ClassComponent name='Class'></ClassComponent> */}
    {/* <FF></FF> */}
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
