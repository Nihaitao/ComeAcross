const app = getApp()
Page({
  data: {
    userInfo: {},
    markers: [],
    scale: 16,
    codeType: 1,
    codeInfo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenLoading: false
  },
  onLoad: function() {
    //创建地图
    this.mapCtx = wx.createMapContext('myMap')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      this.addOrUpdate()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
        this.addOrUpdate()
      }
    } else {
      wx.redirectTo({
        url: '../welcome/welcome',
      })
    }

  },
  addOrUpdate: function() {
    //位置信息
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.mapCtx.moveToLocation();
        let user = this.data.userInfo;
        user.latitude = res.latitude
        user.longitude = res.longitude
        user.openid = app.globalData.openid
        this.setData({
          userInfo: user,
          hiddenLoading: true
        })

        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;

        //更新用户数据
        wx.request({
          url: 'https://www.20180905.cn/ComeAcross/addorupdate',
          data: user,
          method: 'POST',
          success: rsp => {}
        })
        //展示周边用户数据  TODO
        wx.request({
          url: 'https://www.20180905.cn/ComeAcross/getaround',
          data: {
            latitude: res.latitude,
            longitude: res.longitude,
            codeType: this.data.codeType,
            codeInfo: this.data.codeInfo
          },
          success: rsp => {
            var markers = [];
            if (rsp.statusCode == 200) {
              for (let i = 0; i < rsp.data.length; i++) {
                markers.push({
                  id: rsp.data[i].id,
                  latitude: rsp.data[i].latitude,
                  longitude: rsp.data[i].longitude,
                  iconPath: rsp.data[i].iconPath,
                  height: 32,
                  width: 32,
                  callout: {
                    content: "我是谁，我在哪，我在弄啥呢",
                    display: 'ALWAYS',
                    borderRadius: 2,
                    padding: 5,
                    textAlign: 'left',
                    color: '#fff',
                    bgColor: '#222'
                  }
                })
              }
            }
            console.log(markers);
            this.setData({
              markers: markers
            })
          }
        })
      }
    })
  },
  //点击头像
  markertap: function(e) {
    let url = '../info/info?Id=' + e.markerId;
    if (e.markerId == 0)
      url = '../setting/setting';
    wx.navigateTo({
      url: url,
    })
  },
  //定位
  myPosition: function() {
    this.mapCtx.moveToLocation();
  },
  //共享我的位置
  shareMyPosition: function() {
    wx.navigateTo({
      url: '../shareMyPosition/shareMyPosition'
    })
  },
  //我的信息
  myself: function() {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  //我的信息
  friends: function() {
    wx.navigateTo({
      url: '../friends/friends'
    })
  },
  code: function() {
    if (this.data.codeType === 1) {
      this.setData({
        codeType: 0
      })
    } else {
      this.setData({
        codeType: 1
      })
    }
  }
})