const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

/** 
 * 自定义post函数，返回Promise
 * @param {String}      url 接口网址
 * @param {arrayObject} data 要传的数组对象
 * @return {Promise}    promise 返回promise供后续操作
 */
function post(url, data) {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    //网络请求
    wx.request({
      url: url,
      data: postData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res.data);
        } else { //返回错误提示信息
          reject(res.message);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

module.exports = {
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  post: post
}