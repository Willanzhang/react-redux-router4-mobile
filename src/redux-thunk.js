const thunk = ({dispatch, getState}) => next => action => {
  // 支持数组的中间件
  if (Array.isArray(action)) {
    return action.forEach( v => dispatch(v))
  }
  // 如果是函数 执行一下 参数是 dispatch 和 getState
  if(typeof action === 'function') {
    return action(dispatch,getState)
  }
  // 默认是普通action 什么都没干 直接下一个中间件   next = store.dispatch
  return next(action)
}
export default thunk