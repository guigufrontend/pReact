import React,{useContext} from 'react';
import matchPath from './matchPatch';
import RouterContext from './RouterContext';

export default function Route(props){
    const {path ,children, component, render, exact, } = props
    const context = useContext(RouterContext)
    const { location } = context
    const match = path
        ? matchPath(location.pathname, props)
        : context.match
    const componentProps = {
        ...context,
        location,
        match
    }

    return <RouterContext.Provider value={{...props, ...context}}>
        {
             match
             ?  children
                 ? typeof children === 'function' 
                     ? children(componentProps) 
                     : children
                 : component
                 ? React.createElement(component, componentProps) 
                 : render?render(componentProps)
                 :null
             : typeof children === 'function' 
             ? children(componentProps) 
             : null
        }
    </RouterContext.Provider>

}