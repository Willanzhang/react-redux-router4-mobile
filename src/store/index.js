import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import gun from './reducers/gun'
import auth from './reducers/auth'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	gun,
	auth
})

const reduxDevtools = window.devToolsExtension? window.devToolsExtension(): f => f

// 中间件若没有返回会 报错
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	reduxDevtools
))
// const store = createStore(reducers)


// const store = createStore(reducers,applyMiddleware(thunk))
export default store