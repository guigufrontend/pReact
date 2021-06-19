import {scheduleUpdateOnfiber} from './ReactFiberWorkLoop'

function render(vnode, container){
// 此处vnode还没有fiber结构
    const fiberRoot = {
        type: container.nodeName.toLowerCase(),
        stateNode: container,
        props: {children:vnode}
    }
    // 处理更新
    scheduleUpdateOnfiber(fiberRoot)
}
export default{ render }