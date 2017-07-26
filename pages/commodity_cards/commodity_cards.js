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

    //模拟数据
    cards: [
      {
        id: 0,
        name: '美容次数卡',
        shop: '萌萌哒宠物店',
        price: 450,
        pre_price: 555,
        left: 8,
        img: 'http://img.article.onlylady.com/00/05/90/39/247.jpg'
      },
      {
        id: 1,
        name: '洗澡次数卡',
        shop: '萌萌哒宠物店',
        price: 4050,
        pre_price: 5085,
        left: 2,
        img: 'http://img.article.onlylady.com/00/05/90/39/247.jpg'
      },
      {
        id: 2,
        name: '美容次数卡美容次数卡美容次数卡',
        shop: '萌萌哒宠物店',
        price: 666,
        pre_price: 690,
        left: 10,
        img: 'http://img.article.onlylady.com/00/05/90/39/247.jpg'
      },
      {
        id: 3,
        name: '美容次数卡',
        shop: '萌萌哒宠物店',
        price: 450,
        pre_price: 555,
        left: 8,
        img: 'http://img.article.onlylady.com/00/05/90/39/247.jpg'
      },
      {
        id: 4,
        name: '美容次数卡',
        shop: '萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店',
        price: 40,
        pre_price: 55,
        left: 8,
        img: 'http://img.article.onlylady.com/00/05/90/39/247.jpg'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  goToCard(){
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      wx.navigateTo({
        url: '/pages/commodity_cards_use/commodity_cards_use',
      })
    }
  }
})