//app.js
import md5 from 'utils/md5.js';
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.20180905.cn/ComeAcross/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: res => {
              this.globalData.openid = res.data.openid;
              if (this.openidReadyCallback) {
                this.openidReadyCallback(res)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //下载头像
              wx.downloadFile({
                url: res.userInfo.avatarUrl,
                success: rsp => {
                  res.userInfo.iconPath = rsp.tempFilePath.replace('http:/', '').replace('https:/', '');
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo;
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })

            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: '',
    latitude: 0,
    longitude: 0
  },
  /** 
   *  数组对象按key升序, 并生成 md5_hex 签名
   * @param {Array/Object} obj   数组对象
   * @return {String}  encrypted md5加密后的字符串
   */
  makeSign: function (str) {
    // if (!obj) {
    //   console.log('需要加密的数组对象为空')
    // }
    // var str = '';
    // var secret = this.globalData.appSecret;
    // if (!secret) {
    //   console.log('密钥未获取');
    // }
    // //生成key升序数组
    // var arr = Object.keys(obj);
    // arr.sort();
    // for (var i in arr) {
    //   str += arr[i] + obj[arr[i]];
    // }
    // var encrypted = md5(str + secret);
    // return encrypted;
    return md5(str);
  },

})