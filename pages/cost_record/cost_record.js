// cost_record.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航动画
    animationNav: {},

    //当前页
    current: 0,


    //数据模拟
    //消费记录导航
    cost_records: [
      {
        id: 0,
        name: '已评价'
      },
      {
        id: 1,
        name: '未评价'
      },
      {
        id: 2,
        name: '未使用'
      },
    ],

    //已评价
    been_comments: [
      {
        id: 0,
        name: '宠物洗澡宠物洗澡宠物洗澡',
        shop: '瑞文宠物'
      },
      {
        id: 1,
        name: '狗狗美容',
        shop: '瑞文宠物'
      },
      {
        id: 2,
        name: '宠物洗澡宠物洗澡宠物洗澡',
        shop: '瑞文宠物'
      },
      {
        id: 3,
        name: '狗狗染毛',
        shop: '瑞文宠物'
      },
      {
        id: 4,
        name: '宠物洗澡宠物洗澡宠物洗澡',
        shop: '瑞文宠物'
      },
      {
        id: 5,
        name: '狗粮',
        shop: '瑞文宠物'
      },
      {
        id: 6,
        name: '宠物洗澡',
        shop: '瑞文宠物'
      },
    ],

    //接口数据
    orders: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  onShow() {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.host + 'orders',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            orders: res.data.data
          })
        }
        wx.hideLoading()
      }
    })
  },

  //动画封装
  animationNav(id) {
    let left = (id * 33.3) + '%'
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    return animation.left(left).step()
  },

  //点击切换函数
  shiftPage(e) {
    const that = this
    let id = e.currentTarget.dataset.index
    that.setData({
      current: id,
      animationNav: that.animationNav(id).export()
    })
  },

  //swiper变动切换函数
  nextPage(e) {
    const that = this
    let index = e.detail.current
    that.setData({
      current: index,
      animationNav: that.animationNav(index).export()
    })
  },

  //评论跳转
  goToComment(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/cost_comment/cost_comment?id=' + id,
    })
  },

  //查看订单
  goToOrder(e) {
    let id = e.currentTarget.dataset.order_id
    wx.navigateTo({
      url: '/pages/schedule/schedule?id=' + id,
    })
  }
})