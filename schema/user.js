/**
 * 用户验证规则模块
 */

// 1.导入 joi - 为表单中携带的每个数据项，定义验证规则
const joi = require('joi')

/**
 *  string() 值必须是字符串
 *  alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 *  min(length) 最小长度
 *  max(length) 最大长度
 *  required() 值是必填项，不能为undefined
 *  pattern(正则表达式) 值必须是符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(3).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password
  }
}

// 注册和登录表单的验证规则对象
exports.update_userinfo_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    id,
    nickname,
    email: user_email
  }
}

// 重置密码的验证规则对象
exports.update_password_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    oldPwd: password, // 使用password这个规则，验证req.body.oldPwd的值
    // 使用joi.not(joi.ref('oldPwd')).concat(password)规则，验证req.body.newPwd的值
    // 解读：
    // 1.joi.ref('oldPwd') 表示newPwd的值必须和oldPwd的值保持一致
    // 2.joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3..concat()用于合并joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}
