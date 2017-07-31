// group_buy.js
let app = getApp()
//倒计时
let clock, clock_time, timer
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //倒计时
    left_time: null,
    //接口数据
    commodity: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    let id = options.id
    wx.request({
      url: app.globalData.host + 'V1/group/' + id,
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            commodity: res.data.data
          })
          that.getIntervalTime()
        }
      }
    })
  },

  onHide() {
    //清除计时器
    clearInterval(timer)
  },

  onShow() {
    const that = this
    that.resetTimeData()
  },

  onReachBottom() {
    return false
  },

  //压入时间
  getIntervalTime() {
    const that = this
    let current_time = that.data.commodity.lave
    clock = that.formatTime(current_time)
    clock_time = current_time
    that.setGroupInterval()
  },

  //格式化时间
  formatTime(time) {
    let h = parseInt(time / 3600)
    let m = parseInt((time - h * 3600) / 60)
    let s = (time - h * 3600) % 60
    if (h < 10) {
      h = "0" + h
    }
    if (m < 10) {
      m = "0" + m
    }
    if (s < 10) {
      s = "0" + s
    }
    return (h + ":" + m + ":" + s)
  },

  //设置倒计时
  setGroupInterval() {
    const that = this

    //计算时间，保存到全局变量clock和clock_time中
    setInterval(
      () => {
        if (0 >= clock) {
          wx.showModal({
            title: '提示',
            content: '该团已关闭',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                if (wx.navigateBack()) {
                  wx.navigateBack()
                } else {
                  wx.reLaunch({
                    url: '/pages/index/index'
                  })
                }
              }
            }
          })
        }
        clock = that.formatTime(clock_time--)
      }, 1000)
    that.setData({
      left_time: clock
    })
  },

  //重设data计时器
  resetTimeData() {
    const that = this
    //每秒只重设一次data
    that.setData({
      left_time: clock
    })
    timer = setInterval(() => {
      that.setData({
        left_time: clock
      })
    }, 1000)
  },

  //立即下单
  buyCommodity(e) {
    const that = this
    let timestamp = new Date().getTime()
    let group_id = e.currentTarget.dataset.id
    let product_id = that.data.commodity.product_id
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      wx.showLoading({
        title: '支付中',
      })

      wx.request({
        url: app.globalData.host + 'order/make',
        header: app.globalData.header,
        success: res => {
          if (200 == res.data.code) {
            let order_id = res.data.data
            that.setData({
              order_id: order_id
            })
            wx.request({
              url: app.globalData.host + 'order/pay',
              header: app.globalData.header,
              method: 'POST',
              data: {
                product_id: product_id,
                group_id: group_id,
                type: 2,
                number: order_id
              },
              success: res => {
                wx.hideLoading()
                if (200 == res.data.code) {
                  wx.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success: rs => {
                      wx.showToast({
                        title: '开团成功',
                      })
                      that.setData({
                        buy: true
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false
                  })
                }
              }
            })

          }
        }
      })
    }
  },

})