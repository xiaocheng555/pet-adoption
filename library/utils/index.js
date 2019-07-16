import CONFIG from '@/config'

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

/*
 * 根据key获取图片地址
*/
function getImgUrlByKey (key) {
  let isUrl = key.indexOf('http') > -1
  console.log(key, 'key', isUrl ? key : `${CONFIG.imageViewUrl}/${key}`)
  return isUrl ? key : `${CONFIG.imageViewUrl}/${key}`
}

/*
 * 在图片地址中获取key值
*/
function getKeyFromImgUrl (url) {
  return url.split('/pet/static/img/')[1] 
}

export {
  promisify,
  getImgUrlByKey,
  getKeyFromImgUrl
}