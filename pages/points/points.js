// points.js
let app = getApp()
Page({

  data: {
    points: 0
  },

  onLoad() {
    this.firstRequset()
  },

  //请求封装
  firstRequset(){
    const that = this
    wx.showToast({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.host + 'member/point',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            points: res.data.data
          })
          wx.hideLoading()
        }
      }
    })
  },

  //下拉刷新
  onPullDownRefresh() {
    this.firstRequset()
    wx.stopPullDownRefresh()
  }

})