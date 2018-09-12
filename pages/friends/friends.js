// pages/friends/friends.js
Page({
  data: {
    currentTab: 0,
    attentionList: [{
      id:1,
      nikname: "Suck",
      distance: "麓谷企业广场 0m",
      time: "现在",
    }, {
      id: 2,
      nikname: "666dsa",
      distance: "中联重工 500m",
      time: "现在",
      }, {
        id: 3,
      nikname: "Diviner",
      distance: "时代倾城 20km",
      time: "现在",
      }, {
        id: 4,
      nikname: "傻逼",
      distance: "洞庭湖湖畔傻逼村傻逼组38号柳树下的隔壁的王姥姥家 106km",
      time: "5分钟前",
      }, {
        id: 5,
      nikname: "哈哈哈",
      distance: "长崎 日本 1820km",
      time: "一周前",
      }, {
        id: 6,
      nikname: "指指点点指指点点",
      distance: "对面桌5号 3m",
      time: "2017/08/27",
    }],
    fanList: [{
      id: 1,
      nikname: "享燕遇",
      distance: "对面桌5号 3m",
      fanType: 1
    }, {
      id: 2,
      nikname: "享燕遇2",
      distance: "对面桌5号 3m",
      fanType: 0
    }],
    closeFriendList: [{
      id: 1,
      nikname: "享燕遇",
      distance: "对面桌5号 3m",
      time: "现在",
    }, {
      id: 7,
      nikname: "享燕遇2",
      distance: "对面桌5号 3m",
      time: "一周前",
    }]
  },

  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindsearch:function(){
    wx.navigateTo({
      url: '../search/list',
    })
  },
  openActionsheetSh:function(e){
    let item = e.currentTarget.dataset.item;
    let itemList= ['取消关注', '小黑屋'];
    if (item.fanType === 0){
      itemList = ['关注', '小黑屋'];
    } 
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#007aff',
      success(res) {
        if (res.tapIndex === 0) {
          wx.showToast({ title: '取关成功！' });
        } else if (res.tapIndex === 1) {
          wx.showToast({ title: '拉黑成功！' });
        } 
      }
    })
  },
  openActionsheet: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.showActionSheet({
      itemList: ['踢出密友圈', '取消关注', '小黑屋'],
      itemColor: '#007aff',
      success(res) {
        if (res.tapIndex === 0) {
          wx.showToast({ title: '取关成功！' });
        } else if (res.tapIndex === 1) {
          wx.showToast({ title: '拉黑成功！' });
        }
      }
    })
   },
  showFriend: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../info/info?id=' + item.id,
    })
  }
})