/*
 * File: validate.js
 * File Created: 2019-05-17 4:18:23 pm
 * Author: zhanghc11 (huancheng.zhang@meicloud.com)
 * Copyright: 2017 - 2019 Copyright (c), 深圳美云智数科技有限公司
 * -----
 * Last Modified: 2019-05-22 2:35:04 pm
 * Modified By: zhanghc11 (huancheng.zhang@meicloud.com>)
 */

//  全局的正则表达式
const pattern = {
  // 邮箱
  mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  // 国际电话（5-15位数字）
  telephone: /^\d{5,15}$/
}

// 初始化表单校验规则
function initValidateConfig (pattern) {
  const validate = {}
  Object.entries(pattern).forEach(([key, reg]) => {
    validate[key] = function (rule, value, callback) {
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error())
      }
    }
  })
  return validate
}

const validateConfig = initValidateConfig(pattern)

export default validateConfig
