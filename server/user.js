// import { CLIENT_RENEG_LIMIT } from 'tls';

const express = require('express')
const Router = express.Router()
// md5
const utils = require('utility')
const models = require('./model')
const common = require('./common')
const User = models.getModel('user') // 获取表user
const Chat = models.getModel('chat') // 获取表chat
const _filter = { 'pwd': 0, '__v': 0 }
// User.remove({},function(e,d) {
// })
// 获取用户列表 genius boss
Router.get('/list', function (req, res) {
  const { type, pageSize, page } = req.query
  // 分页 简单模式
  // Paging(User.find({type}), page, pageSize,res)
  common.Paging1(User.find({ type }), page || 1, pageSize || 10, res)
  // User.find({'_id' :{ "$gt" :ObjectId("55940ae59c39572851075bfd")} }).explain() // 不知道啥子

  // 筛选
  // User.find({type}, function(err, doc) {
  //   if (!err) {
  //     return res.json({data: doc, errCode:0})
  //   } else {
  //   }
  // })
})

// 获取聊天信息
Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.userId
  User.find({}, function (e, userdoc) {
    if (!e) {
      let users = {}
      userdoc.forEach(v => {
        users[v._id] = { name: v.user, avatar: v.avatar }
      })
      // $or 多个查询条件  用的userId比较靠谱
      Chat.find({ '$or': [{ from: user }, { to: user }] }, function (err, doc) {
        return res.json({ errCode: 0, data: doc, users: users })
      })
    } else {
      console.log(e);
    }
  })
  // Chat.find({}, function (err, doc) {
  // })
})
// 提交已读
Router.post('/readmsg', function (req, res) {
  // 用户有没有cookie
  const userId = req.cookies.userId
  const { from } = req.body
  // 更新信息已读信息    参数 {筛选，设置，是否多行生效,回调}
  Chat.update({from, to: userId},{'$set': {read:true}},{'multi':true}, function(e,d){
    console.log(d,'修改结果') //{ n: 1, nModified: 1, ok: 1 }  n 总数据量  nModified 修改数量  1 修改成功
    if(!e) {
      return res.json({errCode: 0, num: d.nModified})
    }
    return res.json({errCode: 0,msg:'阅读失败'})
  })
})
// 更新信息
Router.post('/update', function (req, res) {
  // 用户有没有cookie
  const userId = req.cookies.userId
  if (!userId) {
    return res.json({ errCode: 1, msg: '请重新登录' })
  }
  const { body } = req
  // 查找并且更新
  User.findByIdAndUpdate(userId, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ errCode: 0, data: data })
  })

  // // 查询表中是否有 此用户
  // User.findOne({user:user}, function(err, doc) {
  //   // 假如查到了
  //   if (doc) {
  //     return res.json({errCode: 1, errMsg: '用户名重复'})
  //   }
  //   User.create({user, pwd, type}, function(e, d) {
  //     if (e) {
  //       return res.json({errCode: 1, errMsg: '服务器繁忙'})
  //     }
  //     return res.json({code: 0})
  //   })
  // })
  // // res.json({errCode: 1})
})

// 登陆
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, errMsg: '用户名或密码错误' })
    } else {
      res.cookie('userId', doc._id)
      return res.json({ errCode: 0, data: doc })
    }
  })
})

// 注册
Router.post('/register', function (req, res) {
  // 用户有没有cookie
  const {user, pwd, type} = req.body
  // 查询表中是否有 此用户
  User.findOne({ user: user }, function (err, doc) {
    // 假如查到了
    if (doc) {
      return res.json({ errCode: 1, errMsg: '用户名重复' })
    }
    const userModel = new User({ user, pwd: md5Pwd(pwd), type })
    userModel.save((e, d) => {
      if (e) {
        return res.json({ errCode: 1, errMsg: '服务器繁忙' })
      } else {
        const { user, type, _id} = d
        res.cookie('userId', _id)
        return res.json({ errCode: 0, data: { user, type, _id } })
      }
    })
    // User.create({user, pwd, type}, function(e, d) {
    //   if (e) {
    //     return res.json({errCode: 1, errMsg: '服务器繁忙'})
    //   }
    //   return res.json({code: 0})
    // })
  })
})

Router.get('/info', function (req, res) {
  const { userId } = req.cookies
  if (!userId) {
    return res.json({ errCode: 1 })
  }
  User.findOne({ _id: userId }, _filter, function (err, doc) {
    if (err) {
      return res.json({ errCode: 1, msg: '服务器繁忙' })
    }
    if (doc) {
      return res.json({ errCode: 0, data: doc })
    }
  })
  // 用户有没有cookie
  // res.json({errCode: 0})
})

// 密码加密
function md5Pwd(pwd) {
  const salt = "rea321ct-ch31at-sfaf8h143n3knjaf"
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
