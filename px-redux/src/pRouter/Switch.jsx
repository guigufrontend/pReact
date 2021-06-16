import React,{useContext} from 'react'
import matchPath from "./matchPatch"
import RouterContext from "./RouterContext"

export default function Switch (props){
    const { children } = props
    const context = useContext(RouterContext)
    const { location } = context
    let match
    let element
    React.Children.forEach(children, child=>{
        if(match==null&&React.isValidElement(child)){
            element = child
            match = child.props.path
            ? matchPath(location.pathname, child.props)
            : context.match
        }
    })
    return match
            ? React.cloneElement(element, {computeMatch: match})
            : null

}