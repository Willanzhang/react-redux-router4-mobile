const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
Router.get('/list', function(req, res) {
  User.find({}, function(err, doc) {
    if (!err) {
      return res.json(doc)
    } else {
    }
  })
})
Router.post('/register', function(req, res) {
  // 用户有没有cookie
  const {user, pwd, type} = req.body.data
  // 查询表中是否有 次用户
  User.findOne({user:user}, function(err, doc) {
    // 假如查到了
    if (doc) {
      return res.json({errCode: 1, msg: '用户名重复'})
    }
    User.create({user, pwd, type}, function(e, d) {
      if (e) {
        return res.json({errCode: 1, msg: '服务器繁忙'})
      }
      return res.json({code: 0})
    })
  })
  res.json({errCode: 1})
})

Router.get('/info', function(req, res) {
  // 用户有没有cookie
  res.json({errCode: 1})
})
module.exports = Router
