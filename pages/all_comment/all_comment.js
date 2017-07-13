// all_comment.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //星星图片
    star_count: [],
    star_img: {
      ok: '/images/shop/star_f.png',
      no: '/images/shop/star_n.png'
    },

    //加载提示
    tips_flag: false,
    tips_all: false,

    //关闭触底刷新
    close: false,

    //商品id
    product_id: 0,

    //评论页数
    page: 1,

    //接口数据
    comments: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    let arr = []
    //评论星数数量
    arr.length = 5
    that.setData({
      star_count: arr,
      product_id: options.id
    })
    wx.request({
      url: app.globalData.host + 'product/comments',
      header: app.globalData.header,
      data: {
        page: 1,
        product_id: options.id
      },
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            comments: res.data.data
          })
        }
      }
    })
  },
  onShow() {
    const that = this
    that.setData({
      page: 1,
      tips_flag: false,
      tips_all: false,
      close: false
    })
  },
  onReachBottom() {
    const that = this
    let page = that.data.page + 1
    if(that.data.close){
      return false
    }
    that.setData({
      tips_flag: true
    })
    wx.request({
      url: app.globalData.host + 'product/comments',
      header: app.globalData.header,
      data: {
        page: page,
        product_id: that.data.product_id
      },
      success: res => {
        if (200 == res.data.code) {
          if (res.data.data.length < 1) {
            that.setData({
              close: true,
              tips_all: true,
              tips_flag: false
            })
            return false
          }
          let temp = [...that.data.comments, ...res.data.data]
          that.setData({
            comments: temp,
            page: page,
            tips_flag: false
          })
        }
      }
    })
  }

})