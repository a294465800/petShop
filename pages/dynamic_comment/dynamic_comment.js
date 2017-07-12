// dynamic_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamic_id: 0,
    comments_left: 200,
    user_comments: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    that.setData({
      dynamic_id: options.id
    })
  },

  //用户评论获取
  getComments(e) {
    const that = this
    let comment_content = e.detail.value
    that.setData({
      user_comments: comment_content,
      comments_left: 200 - comment_content.length
    })
  },

  //评论提交
  commentPost() {
    const that = this
    if (that.data.user_comments) {
      wx.request({
        url: app.globalData.host + '',
        method: 'POST',
        header: app.globalData.header,
        success: res => {

        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写评论',
        showCancel: false
      })
    }
  },
})