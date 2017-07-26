// commodity_cards_use.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //模拟数据
    card_info: {
      id: 1,
      img: 'http://img.article.onlylady.com/00/05/90/39/247.jpg',
      product_name: '美容10次卡',
      store_name: '萌萌哒宠物店',
      price: 550,
      time: '2017-06-08 22:10',
      number: 1215641542151,
      left: 9
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  //消耗次数卡
  cardUse() {
    const that = this
    wx.showModal({
      title: '提示',
      content: '确认消耗一次该次数卡吗？',
      success: res => {
        if (res.confirm) {
          let tmp = that.data.card_info.left - 1
          that.setData({
            'card_info.left': tmp
          })
          wx.showToast({
            title: '消耗成功',
            mask: true,
            complete: () => {
              wx.navigateTo({
                url: '/pages/commodity_cards/commodity_cards',
              })
            }
          })
        }
      }
    })
  }

})