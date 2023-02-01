// 导入定义规则的模块
const joi = require('joi')

// 定义分类名称和分类别名的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 添加分类的校验规则
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}
