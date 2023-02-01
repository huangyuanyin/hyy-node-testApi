// 带入数据库操作模块
const db = require('../db/index')

// 导入处理密码的模块
const bcrypt = require('bcryptjs')

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

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  const sql = `update users set ? where id =?`
  db.query(sql, [req.body, req.body.id], (err, results) => {
    // 1.执行sql语句失败
    if (err) return res.cc(err)
    // 2.执行sql语句成功，但是影响行数不为1
    if (results.affectedRows !== 1) return res.cc('更新用户基本信息失败！')
    // 3.修改用户信息成功
    return res.cc('更新用户基本信息成功!', 0)
  })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
  const sql = `select * from users where id =?`
  db.query(sql, req.auth.id, (err, results) => {
    // 1.执行sql语句失败
    if (err) return res.cc(err)
    // 2.检查指定用户的id是否存在
    if (results.length !== 1) return res.cc('用户不存在')
    // 3.判断密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误！')

    // 更新用户密码的sql
    const sql = 'update users set password=? where id=?'
    // 对新密码进行 bctrypt加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.auth.id], (err, results) => {
      // 1.执行sql语句失败
      if (err) return res.cc(err)
      // 2.执行sql语句成功，但是影响行数不为1
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')
      // 3.更新密码成功
      res.cc('更新密码成功！', 0)
    })
  })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = 'update users set user_pic=? where id=?'
  db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
    // 1.执行sql语句失败
    if (err) return res.cc(err)
    // 2.执行sql语句成功，但是影响行数不为1
    if (results.affectedRows !== 1) return res.cc('更新头像失败！')
    // 更新用户头像成功
    return res.cc('更新头像成功！', 0)
  })
}
