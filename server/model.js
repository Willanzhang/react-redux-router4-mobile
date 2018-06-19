const mongoose = require('mongoose')
// 连接数据库
const DB_URL = 'mongodb://127.0.0.1:27017/user'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
    //链接成功后的回调函数
    console.log('mongo connect success')
})

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {'type': String},
    // 个人简介或者职位简介
    'desc': {'type': String},
    // 职位名
    'title': {'type': String},
    // 如果是boss 还有两个字段
    'company': {'type': String},
    'money': {'type': String}
  },
  chat: {
  }
}
// 批量生成
for( let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}