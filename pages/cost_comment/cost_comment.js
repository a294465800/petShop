// cost_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //评论总星数
    star_count: [],

    //上传图片
    imgs: [],

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

  //图片上传
  addImg() {
    const that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      success: res => {
        let temp = [...that.data.imgs, ...res.tempFilePaths]
        if(temp.length > 3){
          temp.length = 3
        }
        that.setData({
          imgs: temp
        })
      },
    })
  },

  //图片预览
  preImg(e) {
    let img = e.currentTarget.dataset.img
    let imgs = e.currentTarget.dataset.imgs
    wx.previewImage({
      current: img,
      urls: imgs
    })
  },

  //删除图片
  delImg(e) {
    const that = this
    let img = e.currentTarget.dataset.img
    let imgs = that.data.imgs
    let index = imgs.indexOf(img)
    imgs.splice(index, 1)
    that.setData({
      imgs: imgs
    })
  },

  //店铺评分
  getScore(e) {
    const that = this
    let id = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    let temp = 'score.' + type
    that.setData({
      [temp]: id + 1
    })
  },

  commentPost() {
    const that = this
    wx.uploadFile({
      url: 'http://192.168.3.22:8080/upload',
      filePath: that.data.imgs[0],
      name: 'image',
      success: res => {
        console.log(res)
      }
    })
  }

})