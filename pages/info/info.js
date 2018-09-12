// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      id: 1,
      nickName: "享燕遇",
      sex: 1,
      avatarUrl: "../../images/132.jpg",
      attention: 185,
      fans: 25,
      markers: [{
        id: 1,
        latitude: 23.099994,
        longitude: 113.324520,
        name: 'T.I.T 创意园'
      }]
    },
    mapHeight: '55vh'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    wx.request({
      url: 'http://www.20180905.cn:7001/userinfo',
      data: {id:options.Id},
      success: rsp => {
        console.log(rsp);
      }
    })
    console.log(options)

  },
  openActionsheetSh: function(e) {
    // let item = e.currentTarget.dataset.item;
    // let itemList = ['取消关注', '小黑屋'];
    // if (item.fanType === 0) {
    //   itemList = ['关注', '小黑屋'];
    // }
    wx.showActionSheet({
      itemList: ['取消关注', '小黑屋'],
      itemColor: '#007aff',
      success(res) {
        if (res.tapIndex === 0) {
          wx.showToast({
            title: '取关成功！'
          });
        } else if (res.tapIndex === 1) {
          wx.showToast({
            title: '拉黑成功！'
          });
        }
      }
    })
  }
})