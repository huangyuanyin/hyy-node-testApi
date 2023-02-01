// 导入express
const express = require('express')

// 创建服务器的实例对象
const app = express()

const joi = require('joi')

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

// 一定要在路由之前配置解析token的中间件
// 导入配置文件
const config = require('./config')
// 解析token的中间件
const { expressjwt: expressJWT } = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 数据验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007')
})
