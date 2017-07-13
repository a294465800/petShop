// schedule.js
let app = getApp()
let date = new Date()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //时间选择期
    date: '请选择日期',
    time: '请选择时间',
    today_year: date.getFullYear()
  },

  onLoad(options) {
  
  },

  //获取picker
  getDate(e) {
    let val = e.detail.value
    this.setData({
      date: val
    })
  },
  getTime(e) {
    const that = this
    if (that.data.date == '请选择日期') {
      wx.showModal({
        title: '提示',
        content: '请先选择预约日期',
        showCancel: false
      })
      return
    }
    let val = e.detail.value
    this.setData({
      time: val
    })
  },

  //核销
  closeOrder(){
    wx.showModal({
      title: '提示',
      content: '核销代表您已经消费该服务，确定核销该订单吗？',
      success: res => {
        if(res.confirm){
          wx.showToast({
            title: '核销成功',
          })
        }
      }
    })
  },

  //预约
  orderSchedule(){
    const that = this
    let date = that.data.date
    let time = that.data.time
    if (date == '请选择日期' || time == '请选择时间'){
      wx.showModal({
        title: '提示',
        content: '请先选择预约时间',
        showCancel: false
      })
      return false
    }
  }

})