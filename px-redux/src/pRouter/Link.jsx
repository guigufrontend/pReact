import React, {useContext} from 'react';
import RouterContext from './RouterContext';

export default function Link({to ,children}){
    const context = useContext(RouterContext);
    function onClick(e){
        e.preventDefault()
        context.history.push(to)
    }
    return <a onClick={onClick} href={to}>{children}</a>
}