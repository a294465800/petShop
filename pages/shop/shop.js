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
    // shopCategory: [],
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
    // that.setData({
    //   // shopCategorys: res.data.data,
    //   width: Math.floor(100 / that.data.shopCategory.length),
    //   // category_id: res.data.data[0].id
    // })
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