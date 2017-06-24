// shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //导航条效果长度
    width: 0,
    //动画效果
    animationBar: {},

    //当前页数
    current: 0,

    //模拟数据
    //商品导航
    shopCategory: [
      {
        id: 0,
        name: '医疗'
      },
      {
        id: 1,
        name: '寄养'
      },
      {
        id: 2,
        name: '生活'
      },
      {
        id: 3,
        name: '保健'
      },
      {
        id: 4,
        name: '美容'
      }
    ],
    shopItem: [
      {
        id: 0,
        name: '黄毛换肤黄毛换肤黄毛换肤黄毛换肤',
        price: 46,
        sell: 2000,
        img: 'http://photocdn.sohu.com/20151020/mp36640609_1445309900965_2.jpeg'
      }, {
        id: 1,
        name: '黄毛换肤黄毛换肤黄毛换肤黄毛换肤',
        price: 46,
        sell: 2000,
        img: 'http://photocdn.sohu.com/20151020/mp36640609_1445309900965_2.jpeg'
      }, {
        id: 2,
        name: '黄毛换肤黄毛换肤黄毛换肤黄毛换肤',
        price: 46,
        sell: 2000,
        img: 'http://photocdn.sohu.com/20151020/mp36640609_1445309900965_2.jpeg'
      }, {
        id: 3,
        name: '黄毛换肤黄毛换肤黄毛换肤黄毛换肤',
        price: 46,
        sell: 2000,
        img: 'http://photocdn.sohu.com/20151020/mp36640609_1445309900965_2.jpeg'
      }, {
        id: 4,
        name: '黄毛换肤黄毛换肤黄毛换肤黄毛换肤',
        price: 46,
        sell: 2000,
        img: 'http://photocdn.sohu.com/20151020/mp36640609_1445309900965_2.jpeg'
      }, {
        id: 5,
        name: '黄毛换肤黄毛换肤黄毛换肤黄毛换肤',
        price: 46,
        sell: 2000,
        img: 'http://photocdn.sohu.com/20151020/mp36640609_1445309900965_2.jpeg'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    that.setData({
      width: Math.floor(100 / that.data.shopCategory.length)
    })
  },

  //动画封装
  animationBar(id) {
    const that = this
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out'
    })
    let left = (that.data.width * id) + '%'
    return animation.left(left).step()

  },

  //商品目录切换
  shiftPage(e) {
    const that = this
    let id = e.currentTarget.dataset.id

    that.setData({
      current: id,
      animationBar: that.animationBar(id).export()
    })
  },

  nextPage(e) {
    let index = e.detail.current
    const that = this
    that.setData({
      current: index,
      animationBar: that.animationBar(index).export()
    })
  }

})