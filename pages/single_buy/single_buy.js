// single_buy.js
let app = getApp()
let date = new Date()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity_id: 0,

    //时间选择期
    date: '日期',
    time: '时间',
    today_year: date.getFullYear(),
    real_date: null,
    buy: false,

    //下单操作
    order_id: null,

    //模拟数据
    commodity: {
      id: 1,
      name: '宠物洗澡',
      price: 55,
      pre_price: 60,
      img: 'https://media.cool3c.com/files/styles/rs-medium-500/public/flickr/4/3381/3612331019_e619b60349_o.jpg'
    },

    coupons: [
      {
        id: 1,
        name: '商家优惠券：萌萌哒宠物店',
        price: 5
      },
      {
        id: 2,
        name: '洗澡优惠券',
        price: 2
      },
      {
        id: 3,
        name: '商家优惠券：萌萌哒宠物店',
        price: 8
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    const id = options.id
    that.setData({
      commodity_id: id
    })
  },

  //立即下单
  buyCommodity(e) {
    const that = this
    let timestamp = new Date().getTime()
    let product_id = e.currentTarget.dataset.id
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
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
                number: order_id
              },
              success: res => {
                wx.requestPayment({
                  timeStamp: res.data.data.timeStamp,
                  nonceStr: res.data.data.nonceStr,
                  package: res.data.data.package,
                  signType: res.data.data.signType,
                  paySign: res.data.data.paySign,
                  success: rs => {
                    wx.showToast({
                      title: '下单成功',
                    })
                    that.setData({
                      buy: true
                    })
                  }
                })
              }
            })
          } else {
            wx.showToast({
              title: '下单失败',
            })
          }
        }
      })
    }
  },


  //获取picker
  getDate(e) {
    let val = e.detail.value
    this.setData({
      date: val.replace(/\d{4}-/, ''),
      real_date: val
    })
  },
  getTime(e) {
    const that = this
    if (that.data.date == '日期') {
      wx.showModal({
        title: '提示',
        content: '请先选择预约日期',
        showCancel: false
      })
      return
    }
    let val = e.detail.value
    this.setData({
      time: val
    })
  },

  //预约
  getOrderTime() {
    const that = this
    let date = that.data.real_date
    let time = that.data.time
    if (!date || !time) {
      wx.showModal({
        title: '提示',
        content: '请输入预约时间',
        showCancel: false
      })
    } else {
      wx.request({
        url: app.globalData.host + 'schedule/add',
        header: app.globalData.header,
        method: 'POST',
        data: {
          number: that.data.order_id,
          time: that.data.real_date + ' ' + that.data.time
        },
        success: res => {
          if (200 == res.data.code) {
            wx.showModal({
              title: '提示',
              content: '预约成功！有其他问题可直接联系商家',
              showCancel: false
            })
            that.setData({
              buy: false
            })
          } else {
            wx.showToast({
              title: '预约失败',
            })
          }
        }
      })
    }
  },

  //取消预约
  cancelOrderTime() {
    this.setData({
      buy: false
    })
  },

})