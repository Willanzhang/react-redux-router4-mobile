const chunk = ({dispatch, getState}) => next => action => {
  // 如果是函数 之星一下参数是 dispatch 和 getState
  if(typeof action === 'function') {
    return action(dispatch,getState)
  }
  // 默认是什么 都没干
  return next(action)
}
export default thunk