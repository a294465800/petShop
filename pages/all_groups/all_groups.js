// all_groups.js
const app = getApp()
//倒计时
let clock = new Array()
let clock_time = new Array()
let timer

Page({

  data: {
    groups: null,
    group_imgs: [],
    limit: 3,
    //倒计时
    left_time: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    let id = options.id
    let limit = options.limit
    //拼团头像数量
    let arr2 = []
    arr2.length = 15
    wx.request({
      url: app.globalData.host + 'V1/product/group/' + id,
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            group_imgs: arr2,
            groups: res.data.data,
            limit: limit
          })
          that.getIntervalTime()
        }
      }
    })
  },

  //压入时间
  getIntervalTime() {
    const that = this
    let length = that.data.groups.length
    for (let i = 0; i < length; i++) {
      let current_time = that.data.groups[i].lave
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
    timer = setInterval(() => {
      that.setData({
        left_time: clock
      })
    }, 1000)
  },

  //参团
  joinGroup(e) {
    const that = this
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/group_buy/group_buy?id=' + id,
    })
  },

})