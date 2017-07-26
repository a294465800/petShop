// commodity.js
let app = getApp()
//倒计时
let clock = new Array()
let colck_time = new Array()
let timer

Page({

  data: {
    //商品
    commodity_id: 0,
    commodity: {},
    imgUrls: [],
    interval: 4000,
    duration: 500,
    indicator_color: '#666',
    indicator_active_color: '#ff963d',



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

    //模拟数据
    groups: [
      {
        id: 1,
        number: 3,
        people: 1,
        time: '20:16:13',
        imgs: [
          'http://punchline.asia/wp-content/uploads/2016/07/%E5%8D%9A%E7%BE%8E-1024x485.jpg',
          'http://punchline.asia/wp-content/uploads/2016/07/%E5%8D%9A%E7%BE%8E-1024x485.jpg',
          ''
        ],
      },
      {
        id: 2,
        number: 3,
        people: 2,
        time: '10:16:13',
        imgs: [
          'http://punchline.asia/wp-content/uploads/2016/07/%E5%8D%9A%E7%BE%8E-1024x485.jpg',
          'http://punchline.asia/wp-content/uploads/2016/07/%E5%8D%9A%E7%BE%8E-1024x485.jpg',
          ''
        ],
      },
      {
        id: 3,
        number: 3,
        people: 1,
        time: '22:11:13',
        imgs: [
          'http://punchline.asia/wp-content/uploads/2016/07/%E5%8D%9A%E7%BE%8E-1024x485.jpg',
          'http://punchline.asia/wp-content/uploads/2016/07/%E5%8D%9A%E7%BE%8E-1024x485.jpg',
          ''
        ],
      }
    ],

    //接口数据
    comments: null
  },

  onLoad(options) {
    const that = this
    let arr = []
    //评论星数数量
    arr.length = 5
    that.setData({
      commodity_id: options.commodity_id,
      star_count: arr
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
    console.log(1)
    let length = that.data.groups.length
    for (let i = 0; i < length; i++) {
      let current_time = that.data.groups[i].time
      let tmp = current_time.split(':')
      clock.push(current_time)
      colck_time.push(tmp[0] * 3600 + tmp[1] * 60 + tmp[2] * 1)
    }
    that.setGroupInterval()
  },

  //设置倒计时
  setGroupInterval() {
    const that = this
    let length = colck_time.length

    for (let i = 0; i < length; i++) {

      //计算时间，保存到全局变量clock和clock_time中
      setInterval(
        () => {
          ((index) => {
            colck_time[index] = colck_time[index] - 1
            let h = parseInt(colck_time[index] / 3600)
            let m = parseInt((colck_time[index] - h * 3600) / 60)
            let s = (colck_time[index] - h * 3600) % 60
            if (h < 10) {
              h = "0" + h
            }
            if (m < 10) {
              m = "0" + m
            }
            if (s < 10) {
              s = "0" + s
            }
            clock[index] = h + ":" + m + ":" + s
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
                      }else {
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
  }
})