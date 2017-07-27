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

    current: 0,
    animationNav: {},

    //接口数据
    coupons_lost: null,
    coupons: null,

    //模拟数据
    // coupons: [
    //   {
    //     id: 0,
    //     name: '宠物洗澡通用券',
    //     tip: '在线支付专享',
    //     price: 10,
    //     time: '2017.06.24-2017.07.15'
    //   },
    //   {
    //     id: 1,
    //     name: '宠物洗澡通用券宠物洗澡通用券宠物洗澡通用券',
    //     tip: '在线支付专享',
    //     price: 15,
    //     time: '2017.06.24-2017.07.15'
    //   }
    // ]
  },

  onLoad(options) {
  },

  onShow() {
    const that = this
    that.getCoupons()
  },

  //优惠券请求封装
  getCoupons() {
    const that = this
    wx.request({
      url: app.globalData.host + 'V1/my/coupons',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            coupons: res.data.data
          })
        }
      }
    })
    wx.request({
      url: app.globalData.host + 'V1/my/coupons?state=2',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            coupons_lost: res.data.data
          })
        }
      }
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

})