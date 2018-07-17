export function createStore(reducer, enhancer) {
  if (enhancer) {
    // applyMiddleware(createStore)(reducer)
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

// 中间件就是改造 createStore
export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    // 颗粒化？
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 多个中间件
    // compose(fn1, fn2, fn3)
    // fn1(fn2(fn3))
    const middlewareChain = middlewares.map( middleware => middleware(midApi))
    disptch = compose(...middlewareChain)(store.dispatch)
    // dispatch 是一个function

    // 一个中间件
    // dispatch = middleware(midApi)(store.dispatch)
    // middleware(midApi)(store.dispatch)(action)
    return {
      ...store,
      dispatch
    }
  }
}

export function compose(...funcs){
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => (ret(item(...args))))
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
  
  // arr.reduce(callback,[initialValue])
  // callback （执行数组中每个值的函数，包含四个参数）
  // previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
  // currentValue （数组中当前被处理的元素）
  // index （当前元素在数组中的索引）
  // array （调用 reduce 的数组）
  // initialValue （作为第一次调用 callback 的第一个参数。）
  return Object.keys(creators).reduce((ret,item) => {
    ret[item] = bindActionCreator(creators[item],dispatch)
    return ret
  },{})
}