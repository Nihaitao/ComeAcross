const app = getApp()
Page({
  data: {
    message:"有没有一起散步的小伙伴，我在这里，求偶遇"
  },

  onReady: function () {
   //根据系统时间，用户性别改变title的一些逻辑
  },
  formSubmit:function(e){
    console.log(app.globalData.openid)
    e.detail.value.openid = app.globalData.openid;
    e.detail.value.latitude = app.globalData.latitude;
    e.detail.value.longitude = app.globalData.longitude;
    console.log(e.detail.value);
    wx.request({
      url: 'https://www.20180905.cn/ComeAcross/shareposition',
      method:'POST',
      data: e.detail.value,
      success:res=>{

      }
    })
  }

})