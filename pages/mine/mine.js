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
  onLoad: function (options) {
    const that = this
    app.getUserInfo((userInfo) => {
      that.setData({
        userInfo: userInfo
      })
      console.log(that.data.userInfo)
    })
  },

  //消费记录跳转
  goToCostRecord() {
    wx.navigateTo({
      url: '/pages/cost_record/cost_record',
    })
  },

  //优惠券跳转
  goToCoupon() {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },

  //更多信息跳转
  goToMore() {
    wx.navigateTo({
      url: '/pages/more_info/more_info',
    })
  }
})