// 导入 express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 1.导入验证数据合法的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')

// 获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

module.exports = router
