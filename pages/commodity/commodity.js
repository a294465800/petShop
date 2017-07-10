// commodity.js
let date = new Date()
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品
    commodity_id: 0,
    commodity: {},
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    interval: 4000,
    duration: 500,
    indicator_color: '#666',
    indicator_active_color: '#ff963d',

    //时间选择期
    date: '日期',
    time: '时间',
    today_year: date.getFullYear(),

    //下单操作
    buy: false,

    //用户评论
    comments: [
      {
        id: 0,
        userName: '小郭小郭小郭小郭小郭小郭',
        avatar: '/images/head.jpg',
        item: '洗澡',
        time: '2017/05/16',
        content: '医生人很帅，也很健谈，感觉很靠谱',
        commentNumber: 156
      },

      {
        id: 1,
        userName: '小白',
        avatar: '/images/head.jpg',
        item: '疫苗',
        time: '2017/05/10',
        content: '瞬间爆炸',
        commentNumber: 22
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    that.setData({
      commodity_id: options.commodity_id
    })
    wx.request({
      url: app.globalData.host + 'product/' + options.commodity_id,
      header: app.globalData.header,
      success: res => {
        console.log(res)
        that.setData({
          commodity: res.data.data
        })
      }
    })
  },
  onShow() {
    const that = this
    that.setData({
      buy: false
    })
  },

  //商品图片预览
  preImg(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.imggup,
    })
  },

  //查看更多评论
  toMoreComment() {
    wx.navigateTo({
      url: '/pages/all_comment/all_comment',
    })
  },

  //立即下单
  buyCommodity() {
    const that = this
    let timestamp = new Date().getTime()
    wx.request({
      url: app.globalData.host + 'order/pay',
      header: app.globalData.header,
      data: {
        product_id: 1
      },
      success: res => {
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success: rs => {
            console.log(rs)
            wx.showToast({
              title: '下单成功',
            })
            that.setData({
              buy: !that.data.buy
            })
            wx.request({
              url: '',
            })
          }
        })
      }
    })
  },

  //获取picker
  getDate(e) {
    let val = e.detail.value
    this.setData({
      date: val.replace(/\d{4}-/, '')
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

  //保持下单显示
  holdBuy() {
    this.setData({
      buy: true
    })
  },

  //隐藏下单
  hideBuy() {
    this.setData({
      buy: false
    })
  }


})