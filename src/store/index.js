import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import gun from './reducers/gun'
import auth from './reducers/auth'
import user from './reducers/user'
import chatUser from './reducers/chatUser'
import chat from './reducers/chat'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	gun,
	auth,
	user,
	chatUser,
	chat
})

const reduxDevtools = window.devToolsExtension? window.devToolsExtension(): f => f

// 中间件若没有返回会 报错
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	reduxDevtools
))

// const store = createStore(reducers)

// 只使用中间件
// const store = createStore(reducers,applyMiddleware(thunk))
export default store