// my_group.js
let app = getApp()

//倒计时
let clock = new Array()
let clock_time = new Array()
let timer = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //拼团导航
    current: 0,
    group_nav: [
      {
        id: 0,
        name: '正在拼团'
      },
      {
        id: 1,
        name: '拼团成功'
      }
    ],

    //倒计时
    left_time: [],

    //接口数据
    grouping: null,
    group_success: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    that.firstRequest()
  },

  //封装初次请求
  firstRequest() {
    const that = this
    wx.request({
      url: app.globalData.host + 'V1/my/groups',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            grouping: res.data.data
          })
          that.getTime()
        }
      }
    })
    wx.request({
      url: app.globalData.host + 'V1/my/groups?state=2',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            group_success: res.data.data
          })
        }
      }
    })
  },

  //我的拼团数据保存
  saveMyGroups(old, newRes, page, state){

  },

  onHide() {
    //清除计时器
    clearInterval(timer['main'])
  },

  onShow() {
    const that = this
    for(let i in timer){
      clearInterval(timer[i])
    }
    that.setGroupInterval()
    that.resetTimeData()
  },

  //压入时间
  getTime() {
    const that = this
    let length = that.data.grouping.length
    for (let i = 0; i < length; i++) {
      let tmp = that.data.grouping[i].lave
      if (0 >= tmp) {
        wx.redirectTo({
          url: '/pages/my_group/my_group',
        })
      }
      let current_time = tmp
      clock.push(that.formatTime(current_time))
      clock_time.push(current_time)
    }
    that.setGroupInterval()
  },

  //拼接时间格式
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
      timer[i] = setInterval(
        () => {
          ((index) => {
            if (0 >= clock[index]) {
              wx.redirectTo({
                url: '/pages/my_group/my_group',
              })
            }
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

  //分享
  onShareAppMessage(e) {
    let id = e.target.dataset.id
    return {
      title: '快来参加我的拼团啦~~',
      path: '/pages/group_buy/group_buy?id=' + id,
    }
  },

  //导航动画封装
  navAnimation(index) {
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let distance = index * 50 + '%'
    return animation.left(distance).step()
  },

  //导航切换
  shiftPage(e) {
    const that = this
    let index = e.currentTarget.dataset.index
    that.setData({
      animationNav: that.navAnimation(index).export(),
      current: index
    })
  },
  nextPage(e) {
    const that = this
    let current = e.detail.current
    if (that.data.current === e.detail.current) {
      return false
    }
    that.setData({
      animationNav: that.navAnimation(current).export(),
      current: current
    })
  },

  //查看拼团详情
  goToOrder(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/schedule/schedule?id=' + id,
    })
  }
})