const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models = require('./model')
const Chat = models.getModel('chat') // 获取表chat
const app = express()
// work with express
const server = require('http').Server(app)
// Chat.remove({},function(err, doc){
// })
const io = require('socket.io')(server)
io.on('connection', function (socket) {
	socket.on('sendmsg', function (data) {
		const { from, to, msg } = data
		const chatid = [from, to].sort().join('_')
		Chat.create({ chatid, from, to, content: msg}, function (err, doc) {
			io.emit('recvmsg', Object.assign({},doc._doc))
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
// app.get('/',function (req, res) {
//     res.send('<h1>hello word</h1>')
// })

// app.get('/data', function (req,res) {
//     res.json({
// 	isAuth:true,
// 	user: '张博文',
// 	age: 20
// })
// })
server.listen(9093, function () {
	console.log('node app:9093 ')
})


// nodemon 命令可热启动服务器