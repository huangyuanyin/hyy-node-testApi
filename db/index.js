// 导入mysql模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ceshi'
})

module.exports = db
