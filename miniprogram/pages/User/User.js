// pages/User/User.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    canIUseGetUserProfile:false
  },
// ------------------自定义-----------------
callBottomBar:function(){
wx.navigateTo({
  url: '../Create/Create',
})
},

getUserProfile:function(){
  wx.getUserProfile({
    desc: '用于获取用户头像',
    success:(res)=>{
      this.setData({
        userInfo: res.userInfo,
          hasUserInfo: true
      })
      console.log(res.userInfo)
    }
  })
},


// ------------------自定义-----------------















  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})