// 导入数据库操作模块
const db = require('../db/index')

// bcryptjs - 密码加密
const bcrypt = require('bcryptjs')

/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 注册用户的处理函数
exports.regUer = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userInfo = req.body
  // 对表单中的数据进行合法性的校验
  if (!userInfo.username || !userInfo.password) {
    return res.send({ status: 1, message: '用户名或密码不合法' })
  }
  console.log('注册表单', userInfo)

  // 定义sql语句 - 查询用户名是否被占用
  const sqlStr = 'select * from users where username=?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    // 执行 sql 语句失败
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // 用户名可以使用
    // 调用 bcrypt.hashSync() 对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    // 定义sql语句 - 插入新用户
    const sql = 'insert into users set ?'
    db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      // 判断sql语句是否执行成功
      if (err) {
        // return res.send({ status: 1, message: err.message })
        return res.cc(err)
      }
      // 判断影响行数是否为1
      if (results.affectedRows !== 1) {
        // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
        return res.cc('注册用户失败，请稍后再试！')
      }
      // 注册用户成功
      res.send({ status: 0, message: '注册成功！' })
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  res.send('login ok')
}
