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
      urls: ['https://github.com/a294465800/petShop/blob/master/images/mine/QRcode.png?raw=true'],
    })
  }
})