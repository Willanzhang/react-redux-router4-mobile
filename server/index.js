const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app =express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
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
app.listen(9093, function() {
    console.log('node app:9093 ')
})


// nodemon 命令可热启动服务器