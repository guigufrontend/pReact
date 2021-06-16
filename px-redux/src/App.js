import logo from './logo.svg';
import './App.css';
import ReduxPage from './page/ReduxPage'
import HookPage from './page/HookPage'
import store from './store'
// import { Provider} from 'react-redux'
import { Provider} from './pReactRedux'

import ReactReduxPage from './page/ReactReduxPage'
import ReduxHookPage from './page/ReduxHookPage'
import React, { useState } from 'react';

// import {
//   BrowserRouter as Router,
//   // HashRouter as Router,
//   // MemoryRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect,
//   useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,
//   withRouter,
//   Prompt
// } from 'react-router-dom'
import {
  BrowserRouter as Router,

  Route,
  Link,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  withRouter,
  Prompt
} from './pRouter'
import HomePage from './page/routerPages/HomePage';
import UserPage from './page/routerPages/UserPage';
import LoginPage from './page/routerPages/LoginPage';
import _404Page from './page/routerPages/_404Page';
import ProductPage from './page/routerPages/ProductPage';

function App() {
  const [state, setState] = useState(0)
  return (
    <Provider store={store}>
      <div className="App">
            <ReduxPage></ReduxPage>
            <HookPage></HookPage>
            <ReactReduxPage></ReactReduxPage>
            <ReduxHookPage></ReduxHookPage>
      </div>
      <div>
        <h3>routerPage</h3>
        <button onClick={()=>{setState(state+1)}}>{state}</button>
        {/* 三种路由匹配 */}
        {/* children=>component=>render */}
        {/* 独占路由 */}
        <Router>
          <Link to='/'>首页</Link>
          <Link to='/user'>用户中心</Link>
          <Link to='/login'>登录</Link>
          <Link to='/product/123'>商品</Link>
          <Link to='/product/123/detail'>详情</Link>
          <Switch>
              <Route path='/' exact component={HomePage}></Route>
              <Route path='/user' component={UserPage}></Route>
              <Route path='/login' component={LoginPage}></Route>
              <Route path='/product/:id' component={ProductPage}></Route>
              <Route component={_404Page}></Route>
          </Switch>
        </Router>
        
      </div>
    </Provider>
    
  );
}

export default App;
