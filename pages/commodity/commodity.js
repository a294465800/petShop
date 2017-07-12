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
    imgUrls: [],
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
    order_id: null,

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
        that.setData({
          commodity: res.data.data,
          imgUrls: res.data.data.img
        })
      }
    })
  },
  onShow() {
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
  buyCommodity(e) {
    const that = this
    let timestamp = new Date().getTime()
    let product_id = e.currentTarget.dataset.id
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
                  console.log(rs)
                  wx.showToast({
                    title: '下单成功',
                  })
                  that.setData({
                    buy: true
                  })
                  console.log(that.data.buy)
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

  //预约
  getOrderTime(){
    const that = this
    that.setData({
      buy: false
    })
  },

  //取消预约
  cancelOrderTime(){
    const that = this
    that.setData({
      buy: false
    })
  }
})