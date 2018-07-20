const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models = require('./model')
import React from 'react'
function App () {
	return <h2>hello world</h2>
}
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
	console.log('ptch reslove', path.resolve('build/index.html'));
	// 否则返回 index.html 文件
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