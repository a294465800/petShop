// cost_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //评论总星数
    star_count: [],

    //星星图片
    star_img: {
      ok: '/images/shop/star_f.png',
      no: '/images/shop/star_n.png'
    },

    //评分
    score: {
      environment: 0,
      service: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    let arr = []
    arr.length = 5
    that.setData({
      star_count: arr
    })
  },

  //店铺评分
  getScore(e){
    const that = this
    let id = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    let temp = 'score.' + type
    that.setData({
      [temp]: id + 1
    })
  },

})