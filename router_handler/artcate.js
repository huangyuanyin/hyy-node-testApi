// 导入数据库操作模块
const db = require('../db/index')

// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
  // 根据分类的状态，获取所有未被删除的分类列表数据
  // is_delete 为0 表示没有被标记为删除的数据
  const sql = `select * from article_cate where is_delete=0 order by id asc`
  db.query(sql, (err, results) => {
    // 1.执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2.执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results
    })
  })
}

exports.addArticleCates = (req, res) => {
  const sql = `select * from article_cate where name=? or alias=?`
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    // 1.分类名称 和 分类别名 都被占用
    if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    // 2.length等于1的三种情况
    // 第一种：分类名称 和 分类别名 都被占用
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    // 第二种：只有分类名称被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    // 第三种：只有分类别名被占用
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
    const sql = `insert into article_cate set ?`
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      // SQL语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      // 新增文章分类成功
      res.cc('新增文章分类成功！', 0)
    })
  })
}

exports.deleteCateById = (req, res) => {
  const sql = `update article_cate set is_delete=1 where id=?`
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    // 删除文章分类成功
    res.cc('删除文章分类成功！', 0)
  })
}
