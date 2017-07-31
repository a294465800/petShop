// coupon.js
let app = getApp()
Page({

  data: {

    //优惠券导航
    coupon_nav: [
      {
        id: 0,
        name: '可使用'
      },
      {
        id: 1,
        name: '已失效'
      }
    ],

    //刷新页数
    page: {},

    //关闭触底刷新
    close: {},

    current: 0,
    animationNav: {},

    //接口数据
    coupons_lost: null,
    coupons: null,
  },

  onLoad(options) {
    this.getCoupons()
  },

  onShow() {
  },

  //优惠券请求封装
  getCoupons() {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.host + 'V1/my/coupons',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.saveCoupons([], 1, res)
          wx.hideLoading()
        }
      }
    })
    wx.request({
      url: app.globalData.host + 'V1/my/coupons?state=2',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.saveCoupons([], 1, res)
        }
      }
    })
  },

  //优惠券保存函数
  saveCoupons(res, page, newRes) {
    const that = this
    const state = newRes.data.data[0].state
    let tmp = 'page.' + state
    let tmp2 = 'coupons.' + state
    that.setData({
      [tmp2]: [...res, ...newRes.data.data],
      [tmp]: page
    })
  },

  //导航动画封装
  navAnimation(index) {
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let distance = index * 50 + '%'
    return animation.left(distance).step()
  },

  //导航切换
  shiftPage(e) {
    const that = this
    let index = e.currentTarget.dataset.index
    that.setData({
      animationNav: that.navAnimation(index).export(),
      current: index
    })
  },
  nextPage(e) {
    const that = this
    let current = e.detail.current
    if (that.data.current === e.detail.current) {
      return false
    }
    that.setData({
      animationNav: that.navAnimation(current).export(),
      current: current
    })
  },

  //优惠券的触底刷新
  toBottomUse(e) {
    const that = this
    const state = e.currentTarget.dataset.state
    let close = that.data.close[state] || false
    console.log(close)
    if (!state || close) {
      return false
    }
    let page = that.data.page[state] + 1
    wx.request({
      url: app.globalData.host + 'V1/my/coupons?state=' + state + '&page=' + page,
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          let data = res.data.data
          const coupons = that.data.coupons[state]
          if (0 === data.length) {
            let tmp = 'close.' + state
            that.setData({
              [tmp]: true
            })
            return false
          }
          that.saveCoupons(coupons, page, data)
        }
      }
    })
  },

  //下拉刷新
  onPullDownRefresh(){
    this.getCoupons()
    wx.stopPullDownRefresh()
  }

})