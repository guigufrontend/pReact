function render(vnode, container){
    const node = createNode(vnode);
    container.appendChild(node)
}
function isString(s){
    return typeof s === 'string'
}
function createNode(vnode){
    let node;

    // 根据vnode生成node
    const {type, props} = vnode;
    if(isString(type)){
        node = document.createElement(type)
        updateNode(node, props)
        reconcileChildren(node, props.children)
    }else if(typeof type === 'function'){
        node = type.prototype.isReactComponent? updateClassComponent(vnode) : updateFunctionComponent(vnode)
    }else{
        node = document.createTextNode(vnode)
    }
    
    return node
}
function  updateClassComponent (vnode) {
    const {type, props} = vnode
    const instance = new type(props)
    const child = instance.render()
    return createNode(child)
}
function updateFunctionComponent(vnode) {
    const {type, props} = vnode
    const child = type(props)
    return createNode(child)
}
function updateNode(node, props){
    Object.keys(props).filter(k=>k!='children').forEach(k=>{
        node[k] = props[k]
    })
}
function reconcileChildren(parentNode, children){
    const newChildren = Array.isArray(children)?children:[children]
    for(let i=0; i<newChildren.length;i++){
        const child = newChildren[i]
        render(child, parentNode)
    }
}
export default{ render }