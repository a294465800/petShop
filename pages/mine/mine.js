// mine.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onShow() {
    const that = this
    if (!that.data.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  //登录
  Login() {
    const that = this

    app.getSetting((userInfo) => {
      that.setData({
        userInfo: userInfo
      })
    })
  },

  onReachBottom() {
    return false
  },

  //消费记录跳转
  goToCostRecord() {
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      wx.navigateTo({
        url: '/pages/cost_record/cost_record',
      })
    }
  },

  //优惠券跳转
  goToCoupon() {
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      wx.navigateTo({
        url: '/pages/coupon/coupon',
      })
    }
  },

  //更多信息跳转
  goToMore() {
    wx.navigateTo({
      url: '/pages/more_info/more_info',
    })
  },

  //积分跳转
  goToPoints() {
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      wx.navigateTo({
        url: '/pages/points/points',
      })
    }
  }
})