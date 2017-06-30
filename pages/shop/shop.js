// shop.js
let app = getApp()

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

    //商品分类
    shopCategory: [],
    category_id: 0,

    //商品
    shopItem: {},

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
    shopItems: [
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
    wx.request({
      url: app.globalData.host + 'category',
      header: app.globalData.header,
      success: res => {
        that.setData({
          shopCategory: res.data.data,
          width: Math.floor(100 / res.data.data.length),
          category_id: res.data.data[0].id
        })
      }
    })
  },

  onShow() {
    const that = this
    wx.request({
      url: app.globalData.host + 'category',
      header: app.globalData.header,
      success: res => {
        that.setData({
          shopCategory: res.data.data
        })
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: app.globalData.host + 'products/' + that.data.category_id,
          header: app.globalData.header,
          success: rs => {
            let temp = 'shopItem[' + that.data.current + ']'
            that.setData({
              [temp]: rs.data.data
            })
            wx.hideLoading()
          }
        })
      }
    })
  },

  //请求商品封装
  getShopItem(id, index) {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.host + 'products/' + id,
      header: app.globalData.header,
      success: res => {
        let temp = 'shopItem[' + index + ']'
        that.setData({
          [temp]: res.data.data
        })
        wx.hideLoading()
      }
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
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id

    that.setData({
      current: index,
      animationBar: that.animationBar(index).export()
    })
    that.getShopItem(id, index)
  },

  nextPage(e) {
    let index = e.detail.current
    const that = this
    that.setData({
      current: index,
      animationBar: that.animationBar(index).export()
    })
  },

  //商品跳转
  goToGood(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commodity/commodity?commodity_id=' + id
    })
  }

})