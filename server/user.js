const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
Router.get('/list', function(req, res) {
  User.find({}, function(err, doc) {
    if (!err) {
      console.log(doc, 'doc');
      return res.json(doc)
    } else {
      console.log(err);
    }
  })
})
Router.get('/info', function(req, res) {
  // 用户有没有cookie
  res.json({errCode: 1})
})
Router.get('/register', function(req, res) {
  // 用户有没有cookie
  res.json({errCode: 1})
})
module.exports = Router
