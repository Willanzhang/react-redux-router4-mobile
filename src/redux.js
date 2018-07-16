export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
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
  dispatch({type: '@ZHANGBOWEN0717'}) // 初始化时候会所有的执行一次
  return {getState, subscrible, dispatch}
}

export function applyMiddleware(middleware) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    // 颗粒化？
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    dispatch = middleware(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
function bindActionCreator (creator, dispatch) {
  return (...args) => dispatch(creator(...args)) // 透穿
}
export function bindActionCreators(creators, dispatch) {
  // 常规写法
  // let bound = {}
  // Object.keys(creators).forEach( v=> {
  //   let creator = creators[v]
  //   bound[v] = bindActionCreator(creator, dispatch)
  // })
  // return bound
  // reduce  第一个参数是结果(ret)  第二个参数是每个变量(item)
  return Object.keys(creators).reduce((ret,item) => {
    ret[item] = bindActionCreator(creators[item],dispatch)
    return ret
  },{})
}