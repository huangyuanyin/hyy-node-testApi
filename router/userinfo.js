// 导入 express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入路由处理函数没开
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

module.exports = router
