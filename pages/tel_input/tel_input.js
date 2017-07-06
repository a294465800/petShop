// tel_input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //控制验证码按钮
  captcha: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },

  //手机验证
  checkTel(e){
    const that = this
    let tel = e.detail.value
    if (tel.length < 11 && !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(tel))) {
      that.setData({
        captcha: true
      })
    }else {
      that.setData({
        captcha: false
      })
    }
  }

})