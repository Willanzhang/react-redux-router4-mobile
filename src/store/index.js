import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import counter from './reducers/counter'
import auth from './reducers/auth'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	counter,
	auth
})

const reduxDevtools = window.devToolsExtension? window.devToolsExtension(): () => {}

// 中间件没有返回 报错
// const store = createStore(reducers,compose(
// 	applyMiddleware(thunk),
// 	reduxDevtools
// ))
// const store = createStore(reducers)


const store = createStore(reducers,applyMiddleware(thunk))
export default store