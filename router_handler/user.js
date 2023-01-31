// 导入数据库操作模块
const db = require('../db/index')

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
      return res.send({ status: 1, message: err.message })
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
    }
    // TODO:用户名可以使用
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  res.send('login ok')
}
