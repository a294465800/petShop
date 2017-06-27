// commodity.js
let app = getApp()
//时间选择器
// // let date = new Date()
// const months = []
// const days = []
// const hours = []
// const minutes = []

// for (let i = 1; i <= 12; i++) {
//   // if()
//   months.push(i)
// }

// for (let i = 1; i <= 31; i++) {
//   days.push(i)
// }

// for (let i = 1; i <= 24; i++) {
//   hours.push(i)
// }

// for (let i = 0; i <= 60; i++) {
//   minutes.push(i)
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    interval: 4000,
    duration: 500,
    indicator_color: '#666',
    indicator_active_color: '#ff963d',

    // //时间选择器
    // months: months,
    // days: days,
    // hours: hours,
    // minutes: minutes,

    //时间选择期
    date: '日期',
    time: '时间',

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

  },

  //立即下单
  buyCommodity() {
    const that = this
    that.setData({
      buy: !that.data.buy
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