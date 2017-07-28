// commodity.js
let app = getApp()
//倒计时
let clock = new Array()
let clock_time = new Array()
let timer

Page({

  data: {
    //商品
    commodity_id: 0,
    imgUrls: [],
    interval: 4000,
    duration: 500,
    indicator_color: '#666',
    indicator_active_color: '#ff963d',

    //拼团头像设置
    group_imgs: [],

    //下单操作
    group_id: null,
    order_id: null,

    //星星图片
    star_count: [],
    star_img: {
      ok: '/images/shop/star_f.png',
      no: '/images/shop/star_n.png'
    },

    //倒计时
    left_time: [],

    //接口数据
    comments: null,
    commodity: null,
  },

  onLoad(options) {
    const that = this
    let arr = [], arr2 = []
    //评论星数数量
    arr.length = 5
    arr2.length = 15
    //拼团头像数量
    that.setData({
      commodity_id: options.commodity_id,
      star_count: arr,
      group_imgs: arr2
    })
    wx.request({
      url: app.globalData.host + 'product/' + options.commodity_id,
      header: app.globalData.header,
      success: res => {
        that.setData({
          commodity: res.data.data,
          imgUrls: res.data.data.img,
          comments: res.data.data.comments
        })
        that.getIntervalTime()
      }
    })
  },

  onHide() {
    //清除计时器
    clearInterval(timer)
  },

  onShow() {
    const that = this
    that.resetTimeData()
  },

  onReachBottom() {
    return false
  },

  //压入时间
  getIntervalTime() {
    const that = this
    let length = that.data.commodity.groupList.length
    for (let i = 0; i < length; i++) {
      let current_time = that.data.commodity.groupList[i].lave
      clock.push(that.formatTime(current_time))
      clock_time.push(current_time)
    }
    that.setGroupInterval()
  },

  //格式化时间
  formatTime(time) {
    let h = parseInt(time / 3600)
    let m = parseInt((time - h * 3600) / 60)
    let s = (time - h * 3600) % 60
    if (h < 10) {
      h = "0" + h
    }
    if (m < 10) {
      m = "0" + m
    }
    if (s < 10) {
      s = "0" + s
    }
    return (h + ":" + m + ":" + s)
  },

  //设置倒计时
  setGroupInterval() {
    const that = this
    let length = clock_time.length

    for (let i = 0; i < length; i++) {

      //计算时间，保存到全局变量clock和clock_time中
      setInterval(
        () => {
          ((index) => {
            clock[index] = that.formatTime(clock_time[index]--)
          })(i)
        }, 1000)
    }
    that.setData({
      left_time: clock
    })
  },

  //重设data计时器
  resetTimeData() {
    const that = this
    //每秒只重设一次data
    that.setData({
      left_time: clock
    })
    timer = setInterval(() => {
      that.setData({
        left_time: clock
      })
    }, 1000)
  },

  //商品图片预览
  preImg(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.imggup,
    })
  },

  //立即下单
  buyCommodity(e) {
    const that = this
    let timestamp = new Date().getTime()
    let product_id = e.currentTarget.dataset.id
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      wx.showLoading({
        title: '支付中',
      })
      wx.request({
        url: app.globalData.host + 'order/make',
        header: app.globalData.header,
        success: res => {
          if (200 == res.data.code) {
            let order_id = res.data.data
            that.setData({
              order_id: order_id
            })
            wx.request({
              url: app.globalData.host + 'V1/make/group',
              header: app.globalData.header,
              data: {
                product_id: product_id
              },
              success: res => {
                if (200 == res.data.code) {
                  let group_id = res.data.data
                  that.setData({
                    group_id: group_id
                  })
                  wx.request({
                    url: app.globalData.host + 'order/pay',
                    header: app.globalData.header,
                    method: 'POST',
                    data: {
                      product_id: product_id,
                      group_id: group_id,
                      type: 2,
                      number: order_id
                    },
                    success: res => {
                      wx.hideLoading()
                      if (200 == res.data.code) {
                        wx.requestPayment({
                          timeStamp: res.data.data.timeStamp,
                          nonceStr: res.data.data.nonceStr,
                          package: res.data.data.package,
                          signType: res.data.data.signType,
                          paySign: res.data.data.paySign,
                          success: rs => {
                            wx.showToast({
                              title: '开团成功',
                            })
                            that.setData({
                              buy: true
                            })
                          }
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: res.data.msg,
                          showCancel: false
                        })
                      }
                    }
                  })
                } else {
                  wx.showToast({
                    title: '开团失败',
                  })
                }
              }
            })
          }
        }
      })
    }
  },

  //查看所有评论
  goToAllComments(e) {
    const that = this
    if (that.data.comments.length < 1) {
      wx.showToast({
        title: '没有评论',
      })
    } else {
      let id = e.currentTarget.dataset.id
      let title = that.data.commodity.title
      wx.navigateTo({
        url: '/pages/all_comment/all_comment?id=' + id + '&title=' + title,
      })
    }
  },

  //具体评论点赞
  commentGood(e) {
    if (!app.globalData.userInfo) {
      app.goToTelInput()
    } else {
      const that = this
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      let temp = "comments[" + index + '].likes'
      wx.request({
        url: app.globalData.host + 'product/comment/like',
        method: 'POST',
        header: app.globalData.header,
        data: {
          comment_id: id
        },
        success: res => {
          if (200 == res.data.code) {
            that.setData({
              [temp]: (Number(that.data.comments[index].likes) + Number(res.data.data))
            })
          } else {
            wx.showToast({
              title: '点赞失败',
            })
          }
        }
      })
    }

  },

  //具体评论图片预览
  commentPreImg(e) {
    const that = this
    let img = e.currentTarget.dataset.img
    let index = e.currentTarget.dataset.index
    let imgs = that.data.comments[index].img
    wx.previewImage({
      urls: imgs,
      current: img
    })
  },

  //单独购买
  goToBuySingle(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/single_buy/single_buy?id=' + id,
    })
  },

  //参团
  joinGroup(e) {
    const that = this
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/group_buy/group_buy?id=' + id,
    })
  },

  //查看所有拼团
  goToAllGroups(e) {
    const that = this
    let id = e.currentTarget.dataset.id
    let limit = e.currentTarget.dataset.limit
    wx.navigateTo({
      url: '/pages/all_groups/all_groups?id=' + id + '&limit=' + limit,
    })
  }
})