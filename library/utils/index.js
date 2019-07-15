/*  
 * 将uni的方法转为promise返回
*/
function promisify (original) {
  return function(opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

export {
  promisify
}