const taskQueue = []
const timerQueue = []

// 过期时间
let deadline = 0;
const threshold = 5; //时间间隔

export function scheduleCallback(callback) {
    const newTask = {callback}
    taskQueue.push(newTask)
    schedule(flushWork)
}

function schedule(callback) {
    timerQueue.push(callback)
    postMessage();
}
 
const postMessage = ()=>{
    // 没有MessageChannel的可以使用timeout
    // MessageChannel比timeout更早执行
    const {port1, port2} = new MessageChannel();
    port1.onmessage = ()=>{
        console.log('timerQueue', timerQueue, timerQueue[0])
        let tem = timerQueue.splice(0, timerQueue.length)
        tem.forEach(item=>item())
    }
    port2.postMessage(null)
}
function flushWork(){
    deadline = getCurrentTime() + threshold
    let currentTask = taskQueue[0]
    while(currentTask&&!shouldYield()){
        const {callback} = currentTask
        callback()
        console.log('taskQueue', taskQueue, taskQueue[0])
        taskQueue.shift();
        currentTask = taskQueue[0]
    }
}
export function shouldYield() {
     return getCurrentTime() >= deadline
}
export function getCurrentTime() {
    return performance.now()
}   