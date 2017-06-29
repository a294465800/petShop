// more_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QRcode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //二维码跳转
  showQRcode() {
    this.setData({
      QRcode: true
    })
  },
  hideQRcode() {
    this.setData({
      QRcode: false
    })
  },

  //二维码预览
  preQRcode(e) {
    wx.previewImage({
      urls: ['https://mmbiz.qlogo.cn/mmbiz_png/MDVUyENYkQMExia62HDMWiaXJbby9N9EpoAoCEGDxpw8FsKgrLZtVzP6hjdL5yKb5S5VkPmS2Q1bNvwsDhTyFAvw/0?wx_fmt=png'],
    })
  }
})