// commodity_cards.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //次数卡导航
    cards_nav: [{
      id: 0,
      name: '使用中'
    }, {
      id: 1,
      name: '已失效'
    }],

    //导航动画
    animationNav: {},
    current: 0,

    //接口数据
    cards: null,
    cards_lost: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  onShow() {
    const that = this
    that.firstRequest()
  },

  //初次请求封装
  firstRequest() {
    const that = this
    wx.request({
      url: app.globalData.host + 'V1/my/card',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            cards: res.data.data
          })
        }
      }
    })

    wx.request({
      url: app.globalData.host + 'V1/my/card/?state=2',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            cards_lost: res.data.data
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

  //次数卡跳转
  goToCard(e) {
    let id = e.currentTarget.dataset.id
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      wx.navigateTo({
        url: '/pages/commodity_cards_use/commodity_cards_use?id=' + id,
      })
    }
  }
})