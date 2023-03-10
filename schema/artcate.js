// 导入定义规则的模块
const joi = require('joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()

// 添加分类的校验规则
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}

// 根据Id删除分类的校验规则
exports.delete_cate_schema = {
  params: {
    id
  }
}

// 根据Id获取分类的校验规则
exports.get_cate_schema = {
  params: {
    id
  }
}

// 更新分类的校验规则
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias
  }
}
