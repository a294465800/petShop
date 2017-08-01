// shop.js
let app = getApp()

Page({

  data: {

    //当前目录
    current: 0,

    //商品分类
    category_id: 0,

    //商品
    shopItem: {},

    //判断当前分类页数
    page: {},

    //加载提示
    tips_all: {},

    //关闭触底刷新
    close: {},
    flag_bottom: false,

    //接口数据
    shopCategorys: null,
    shopItem: null
  },

  onLoad(options) {
    const that = this
    wx.request({
      url: app.globalData.host + 'category',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            shopCategorys: res.data.data,
            category_id: res.data.data[0].id
          })
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: app.globalData.host + 'products/' + that.data.category_id,
            header: app.globalData.header,
            success: rs => {
              if (200 == rs.data.code) {
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
  },

  //请求商品封装
  getShopItem(id, index) {
    const that = this
    if (that.data.shopItem[index]) {
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

  //商品目录切换
  shiftPage(e) {
    const that = this
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id

    that.setData({
      current: index,
      category_id: id,
    })
    that.getShopItem(id, index)
  },

  //商品跳转
  goToGood(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commodity/commodity?commodity_id=' + id
    })
  },

  //触底刷新
  toBottom() {
    const that = this
    //防止重复触发
    if (that.data.flag_bottom) {
      return false
    }
    let current = that.data.current
    let now_close = that.data.close[current] || false

    //主动关闭
    if (now_close) {
      return false
    }
    let id = that.data.category_id
    let page = "page." + current
    let now_page = (that.data.page[current] || 1) + 1
    let tips_all = "tips_all." + current
    let close = "close." + current
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.host + 'products/' + id,
      header: app.globalData.header,
      data: {
        page: now_page
      },
      success: res => {
        wx.hideLoading()
        if (200 == res.data.code) {
          if (res.data.data.length < 1) {
            that.setData({
              [tips_all]: true,
              [close]: true,
              flag_bottom: false
            })
            return false
          }
          let temp = [...that.data.shopItem[current], ...res.data.data]
          let temp_item = 'shopItem[' + current + ']'
          that.setData({
            [page]: now_page,
            [temp_item]: temp,
            flag_bottom: false
          })
        }
      }
    })

    that.setData({
      flag_bottom: true
    })
  },

})