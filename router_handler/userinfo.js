// 带入数据库操作模块
const db = require('../db/index')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  const sql = 'select id,username,nickname,email,user_pic from users where id=?'
  db.query(sql, req.auth.id, (err, results) => {
    // 1.执行sql语句失败
    if (err) return res.cc(err)
    // 2.执行sql语句成功，但是查询到的数据条数不等于1（查询的结果可能为空）
    if (results.length !== 1) return res.cc('获取用户信息失败！')
    // 3.将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取用户信息成功',
      data: results[0]
    })
  })
}
