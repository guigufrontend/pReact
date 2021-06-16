import React, {useContext, useState, useEffect, useLayoutEffect } from "react"
import { bindActionCreators } from './bindActionCreators'

const Contentx = React.createContext()

export function useDispatch(){
    const store = useContext(Contentx)

     return store.dispatch
}


export function useSelector(func){
    const [, setState] = useState()

    const store = useContext(Contentx)
    const slectState = func(store.getState())
    useLayoutEffect(() => {
        const clean = store.subscribe(()=>{
            const date = new Date
            setState(date.valueOf())
        })
        return () => {
            clean()
        }
    }, [store])
    return slectState
}

export function connect(mapStateToProps, mapDispatchToProps ){
    return (WrappedComponent)=>(props)=>{
        const [, setState] = useState()
        const store = useContext(Contentx)
        
        const stateProps = mapStateToProps(store.getState())
        let dispatchProps = {}
        if( typeof mapDispatchToProps === 'function'){
            dispatchProps = mapDispatchToProps(store.dispatch)
        }else{
            dispatchProps = {dispatch:store.dispatch, ...bindActionCreators(mapDispatchToProps, store.dispatch)}
        }
         
        useLayoutEffect(() => {
            const clean = store.subscribe(()=>{
                const date = new Date
                setState(date.valueOf())
            })
            return () => {
                clean()
            }
        }, [])
        return <WrappedComponent {...props} {...stateProps} {...dispatchProps}></WrappedComponent>
    }
}


export function Provider({store, children}){
    return <Contentx.Provider 
        value={store}
    >
        {children}
    </Contentx.Provider>
}

