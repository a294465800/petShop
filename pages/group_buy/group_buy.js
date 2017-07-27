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
    // left_time: [],

    commodity: {
      id: 1,
      name: '宠物洗澡',
      shop: '萌萌哒宠物店',
      time: '20:11:31',
      left: 1,
      number: 3,
      imgs: [
        'https://media.cool3c.com/files/styles/rs-medium-500/public/flickr/4/3381/3612331019_e619b60349_o.jpg',
        'https://media.cool3c.com/files/styles/rs-medium-500/public/flickr/4/3381/3612331019_e619b60349_o.jpg',
        'https://media.cool3c.com/files/styles/rs-medium-500/public/flickr/4/3381/3612331019_e619b60349_o.jpg'
      ],
      price: 55,
      pre_price: 60,
      img: 'https://media.cool3c.com/files/styles/rs-medium-500/public/flickr/4/3381/3612331019_e619b60349_o.jpg'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    that.getIntervalTime()
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
    let current_time = that.data.commodity.time
    let tmp = current_time.split(':')
    clock = current_time
    clock_time = tmp[0] * 3600 + tmp[1] * 60 + tmp[2] * 1
    that.setGroupInterval()
  },

  //设置倒计时
  setGroupInterval() {
    const that = this

    //计算时间，保存到全局变量clock和clock_time中
    setInterval(() => {
      clock_time = clock_time - 1
      let h = parseInt(clock_time / 3600)
      let m = parseInt((clock_time - h * 3600) / 60)
      let s = (clock_time - h * 3600) % 60
      if (h < 10) {
        h = "0" + h
      }
      if (m < 10) {
        m = "0" + m
      }
      if (s < 10) {
        s = "0" + s
      }
      clock = h + ":" + m + ":" + s
    }, 1000)

    that.setData({
      'commodity.time': clock
    })
  },

  //重设data计时器
  resetTimeData() {
    const that = this
    //每秒只重设一次data
    that.setData({
      'commodity.time': clock
    })
    timer = setInterval(() => {
      that.setData({
        'commodity.time': clock
      })
    }, 1000)
  },

  //立即下单
  buyCommodity(e) {
    const that = this
    let timestamp = new Date().getTime()
    let product_id = e.currentTarget.dataset.id
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
              url: app.globalData.host + 'V1/make/group',
              header: app.globalData.header,
              data: {
                product_id: product_id
              },
              success: res => {
                if (200 == res.data.code) {
                  let group_id = res.data.data
                  that.setData({
                    group_id: group_id
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
                              title: '参团成功',
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
                } else {
                  wx.showToast({
                    title: '参团失败',
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