export function createStore(reducer) {
  let currentState = {}
  let currentListeners = []
  function getState() {
    return currentState
  }
  function subscrible(listener) {
    currentListeners.push(listener)
  }
  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v())
    return action
  }
  dispatch({type: '@ZHANGBOWEO0717'}) // 初始化时候会所有的执行一次
  return {getState, subscrible, dispatch}
}