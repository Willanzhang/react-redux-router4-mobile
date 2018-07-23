const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models = require('./model')

// import React from 'react'

// // npm i -S css-modules-require-hook
// // css-modules-require-hook
// import csshook from 'css-modules-require-hook/preset' // import hook before routes 引入必须在 jsx 组件之前
// import assethook from 'asset-require-hook'
// // 只能处理require 的图片..
// assethook({
//   extensions: ['jpg']
// })
// import {renderToStaticMarkup, renderToString} from 'react-dom/server'
// import ServerApp from '../src/serverApp.js'
// import { StaticRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import gun from '../src/store/reducers/gun'
// import auth from '../src/store/reducers/auth'
// import user from '../src/store/reducers/user'
// import chatUser from '../src/store/reducers/chatUser'
// import chat from '../src/store/reducers/chat'
// import thunk from 'redux-thunk'
// import staticPath from '../build/asset-manifest.json'


// const reducers = combineReducers({
// 	gun,
// 	auth,
// 	user,
// 	chatUser,
// 	chat
// })
// const store = createStore(reducers,compose(
// 	applyMiddleware(thunk)
// ))
// // react 组件 => div
// function App () {
// 	return <div>
// 		<h2>server render</h2>
// 		<h2>hello world</h2>
// 	</div>
// }
// console.log(renderToString(<App/>));
const Chat = models.getModel('chat') // 获取表chat
const app = express()
const path = require('path')
// work with express
const server = require('http').Server(app)
// 删除聊天所有数据
// Chat.remove({},function(err, doc){
// })

const io = require('socket.io')(server)
io.on('connection', function (socket) {
	socket.on('sendmsg', function (data) {
		const { from, to, msg } = data
		const chatid = [from, to].sort().join('_')
		Chat.create({ chatid, from, to, content: msg}, function (err, doc) {
			if (!err) {
				io.emit('recvmsg', Object.assign({},doc._doc))
			}
		})
		console.log(data, 1111)
		// 接受到事件后 发送全局事件
		// io.emit('recvmsg', data)
	})
	// console.log('user login')
})
app.use(cookieParser()) // 操作cookie
app.use(bodyParser.json()) // 处理post请求
app.use('/user', userRouter) // 路由
// 中间件
app.use(function(req, res,next){
	// 如果是 路径是 user 和 static 开头 则执行下一个
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}
	// console.log('ptch reslove', path.resolve('build/index.html'));
	// 否则返回 index.html 文件
// 	let context = {} // 如果路由有跳转 context 能告诉我们是否有跳转
// 	const htmlRes = renderToString(<Provider store={store}>
// 		<StaticRouter
// 			location={req.url}
// 		>
// 			<Router>
// 			</Router>
// 		</StaticRouter>
// 	</Provider>)
// 	const pageHtml = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//     <meta name="theme-color" content="#000000">
//     <!--
//       manifest.json provides metadata used when your web app is added to the
//       homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
//     -->
//     <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
//     <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
// 		<link rel="stylesheet" href="/${staticPath['main.css']}">
//     <title>React App</title>
//   </head>
//   <body>
//     <noscript>
//       You need to enable JavaScript to run this app.
//     </noscript>
//     <div id="root">${htmlRes}</div>
// 		<script src="/${staticPath['main.js']}"></script>
//   </body>
// </html>
// `
// 	return res.send(pageHtml)
	return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build'))) // 设置静态资源
// app.get('/',function (req, res) {
//     res.send('<h1>hello word</h1>')
// })

// app.get('/data', function (req,res) {
//     res.json({
// 	isAuth:true,
// 	user: 'xx',
// 	age: 20
// })
// })
server.listen(9093, function () {
	console.log('node app:9093 ')
})


// nodemon 命令可热启动服务器