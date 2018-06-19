const express = require('express')
const userRouter = require('./user')
const app =express()

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