// cost_record.js
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

})