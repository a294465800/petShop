// ad_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    that.setData({
      content: options.content
    })
  },
})