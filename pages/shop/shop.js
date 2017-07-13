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

    //当前目录
    current: 0,

    //商品分类
    category_id: 0,

    //商品
    shopItem: {},

    //判断当前分类页数
    page: {
      0: 1,
      1: 1,
      2: 1
    },

    //加载提示
    tips_flag: {
      0: false,
      1: false,
      2: true
    },
    tips_all: {
      0: false,
      1: false,
      2: false
    },

    //关闭触底刷新
    close: {
      0: false,
      1: false,
      2: true
    },

    //接口数据
    shopCategorys: null,
    shopItem: null
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
        if (200 == res.data.code) {
          that.setData({
            shopCategorys: res.data.data,
            width: Math.floor(100 / res.data.data.length),
            category_id: res.data.data[0].id
          })
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: app.globalData.host + 'products/' + that.data.category_id,
            header: app.globalData.header,
            success: rs => {
              if(200 == rs.data.code){
                let temp = 'shopItem[' + that.data.current + ']'
                that.setData({
                  [temp]: rs.data.data
                })
                wx.hideLoading()
              }
            }
          })
        }
      }
    })
  },

  onShow() {
    const that = this
  },

  //请求商品封装
  getShopItem(id, index) {
    const that = this
    if (that.data.shopItem[index]){
      return
    }
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
      category_id: id,
      animationBar: that.animationBar(index).export()
    })
    that.getShopItem(id, index)
  },
  nextPage(e) {
    const that = this
    let index = e.detail.current
    let id = that.data.shopCategorys[index].id
    that.setData({
      current: index,
      category_id: id,
      animationBar: that.animationBar(index).export()
    })
    that.getShopItem(id, index)
  },

  //商品跳转
  goToGood(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commodity/commodity?commodity_id=' + id
    })
  }

})