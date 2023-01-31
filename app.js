// 导入express
const express = require('express')

// 创建服务器的实例对象
const app = express()

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件（在路由之前，封装res.cc函数）
app.use((req, res, next) => {
  // status 默认值为1，表示失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      status,
      messsage: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007')
})
