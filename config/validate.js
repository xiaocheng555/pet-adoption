/*
 * File: validate.js
 * File Created: 2019-05-17 4:18:23 pm
 * Author: zhanghc11 (huancheng.zhang@meicloud.com)
 * Copyright: 2017 - 2019 Copyright (c), 深圳美云智数科技有限公司
 * -----
 * Last Modified: 2019-05-22 2:35:04 pm
 * Modified By: zhanghc11 (huancheng.zhang@meicloud.com>)
 */

//  全局的正则表达式或者验证函数
const pattern = {
  // 邮箱
  mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  // 国际电话（5-15位数字）
  telephone: /^\d{5,15}$/,
	// 非空字符串、数组
	nonEmpty: /\S+/
}

// 初始化表单校验规则
function initValidateConfig (pattern) {
	// 存储所有验证规则
  const _validateConfig = {}
	
  Object.entries(pattern).forEach(([key, reg]) => {
		let validateFn
		if (isRegExp(reg)) {
			// 将正则表达式转化为c-form组件（同el-element）可使用的验证函数
			validateFn = function (rule, value, callback) {
			  if (reg.test(value.toString())) {
			    callback()
			  } else {
			    callback(new Error())
			  }
			}
		} else {
			validateFn = reg
		}
		_validateConfig[key] = (validateFn)
  })
  return _validateConfig
}

function isRegExp (value) {
	return Object.prototype.toString.call(value) === '[object RegExp]'
}

const validateConfig = initValidateConfig(pattern)

export default validateConfig
