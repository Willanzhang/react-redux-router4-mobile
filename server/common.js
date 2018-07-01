// 分页函数
function Paging(find, page, pageSize, res) {
  find.skip(pageSize * (page - 1)).limit(pageSize - 0).exec('find', function (e, d) {
    if (!e) {
      return res.json({
        errCode: 0,
        data: d,
        page: {
          pageSize,
          currentPage: page
        }
      })
    } else {
      return res.json({ errCode: 1, msg: '服务器繁忙' })
    }
  })
}
// 分页优化
function Paging1(find, page, pageSize, res) {
  page = Number(page)
  pageSize = Number(pageSize)
  let last_id = ''
  let limit = pageSize * (page - 1)
  let totalPage
  if (page == 1) {
    limit = pageSize - 0
  }
  // 数量 在函数内获取数量
  find.count({}, function (err, count) {
    if (err) {
      next(err)
    } else {
      totalPage = Math.ceil(count/pageSize)
      find.limit(limit).exec('find',function (err, doc) {
        if (!err) {
          // 处理数量为0时
          try {
            last_id = doc[doc.length - 1]._id
          } 
          catch (err) {
            return res.json({errCode:0,data:[],page: {
              currentPage: page,
              pageSize,
              totalPage
            }})
          }
          if (page == 1) {
            return res.json({
              data: doc, errCode: 0, page: {
                currentPage: page,
                pageSize,
                totalPage
              }
            })
          }
          find.find({ '_id': { '$gt': last_id } })
            .limit(pageSize - 0).exec('find',function (err, doc) {
              if (!err) {
                return res.json({
                  errCode: 0, data: doc, page: {
                    currentPage: page,
                    pageSize,
                    totalPage
                  }
                })
              } else {
                return res.json({ errCode: 1, msg: '服务器繁忙2' })
              }
            })
        } else {
          return res.json({ errCode: 1, msg: '服务器繁忙1' })
        }
      })
    }
  })
}
module.exports = {
  Paging,
  Paging1
}