import React from 'react';
// import { Route, Link } from 'react-router-dom'
import { Route, Link } from '../../pRouter'
import DetailPage from './DetailPage';

export default ({location, match})=>{
    console.log(match)
    const {id} = match.params
    const { url } = match
    return <div>
        <h3>product-{id}</h3>
        <Link to={url+'/detail'}>详情</Link>
        <Route path={url+'/detail'} component={DetailPage}></Route>
    </div>
}