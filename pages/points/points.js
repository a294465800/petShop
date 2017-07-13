// points.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points: 0
  },

  onLoad(options) {
    const that = this
    wx.request({
      url: app.globalData.host + 'member/point',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            points: res.data.data
          })
        }
      }
    })
  },


})