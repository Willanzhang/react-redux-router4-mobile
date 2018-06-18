const express = require('express')
const Router = express.Router()

Router.get('./info', function(req, res) {
  res.send('123')
})
module.exports = Router