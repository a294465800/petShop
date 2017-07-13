//index.js
//获取应用实例
let app = getApp()

Page({
  data: {
    shop: app.globalData.shop,
    imgUrls: [
      '/images/ad.jpg'
    ],
    interval: 4000,
    duration: 500,
    userInfo: {},

    //星星
    star_count: [],
    star_img: {
      ok: '/images/shop/star_f.png',
      no: '/images/shop/star_n.png'
    },

    current: 0,

    //创建动画
    animationNav: {},

    //导航条
    nav: [{
      name: '商家动态',
      id: 0
    }, {
      name: '用户评论',
      id: 1
    }, {
      name: '商家信息',
      id: 2
    }],

    //开关
    flag: {
      nav_flag: false,
      good_flag: false
    },

    //判断当前分类
    category: {
      0: 'moments',
      1: 'comments',
      2: 'store'
    },
    page: {
      0: 1,
      1: 1,
      2: 1
    },

    //加载提示
    tips_flag: {
      0: false,
      1: false,
      2: true
    },
    tips_all: {
      0: false,
      1: false,
      2: false
    },

    //关闭触底刷新
    close: {
      0: false,
      1: false,
      2: true
    },

    //接口数据
    //店铺信息
    store: null,
    //动态
    moments: null,
    //评论
    comments: null
  },
  onLoad() {
    let that = this

    let arr = []
    //评论星数数量
    arr.length = 5
    that.setData({
      star_count: arr
    })

    wx.request({
      url: app.globalData.host + 'moments',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            moments: res.data.data
          })
        }
      }
    })

    wx.request({
      url: app.globalData.host + 'comments',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            comments: res.data.data
          })
        }
      }
    })

    wx.request({
      url: app.globalData.host + 'store',
      header: app.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          that.setData({
            store: res.data.data
          })
          wx.setNavigationBarTitle({
            title: '小主帮 — ' + res.data.data.name,
          })
        }
      }
    })
    app.getSetting((userInfo) => {
      that.setData({
        userInfo: userInfo
      })
    })
  },

  onShow() {
  },

  //下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },

  //分享
  onShareAppMessage() {
    return {
      title: '小主帮',
      path: '/page/index/index'
    }
  },

  //动画封装
  animationNav(id) {
    let left = (id * 33.3) + '%'
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    return animation.left(left).step()
  },

  //点击切换函数
  nextPage(e) {
    const that = this
    let id = e.currentTarget.dataset.id
    that.setData({
      current: id,
      animationNav: that.animationNav(id).export()
    })
  },

  //图片预览
  preImg(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.imggup,
    })
  },

  //打开商家地图
  openLocation() {
    wx.showLoading({
      title: '地图加载中',
    })
    let latitude = 23.138595
    let longitude = 113.328032
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,
      name: '森乾科技',
      address: '广东省广州市番禺区永恒大街6号花城创意园2号楼122',
      success: res => {
        wx.hideLoading()
      }
    })
  },

  //电话商家
  callStore(e) {
    const that = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },

  //商家图片预览
  preStoreImg(e) {
    const that = this
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: that.data.store.images,
    })
  },

  //点赞设置
  good() {
    const that = this
    if (that.data.flag.good_flag) {
      that.setData({
        'flag.good_flag': false
      })
    } else {
      that.setData({
        'flag.good_flag': true
      })
    }
  },

  //评论
  goToComment(e) {
    let moment_id = e.currentTarget.dataset.moment_id
    let comment_id = e.currentTarget.dataset.comment_id
    wx.navigateTo({
      url: '/pages/dynamic_comment/dynamic_comment?moment_id=' + moment_id + '&comment_id=' + comment_id,
    })
  },

  //触底刷新
  onReachBottom() {
    const that = this
    let current = that.data.current
    let now_close = that.data.close[current]
    if (now_close){
      return false
    }
    let category = that.data.category[current]
    let page = "page." + current
    let now_page = that.data.page[current] + 1
    let tips_flag = "tips_flag." + current
    let tips_all = "tips_all." + current
    let close = "close." + current
    console.log(now_page)
    that.setData({
      [tips_flag]: true
    })
    wx.request({
      url: app.globalData.host + category,
      header: app.globalData.header,
      data: {
        page: now_page
      },
      success: res => {
        if( 200 == res.data.code){
          if(res.data.data.length < 1){
            that.setData({
              [tips_flag]: false,
              [tips_all]: true,
              [close]: true
            })
            return false
          }
          let temp = [...that.data[category], ...res.data.data]
          that.setData({
            [category]: temp,
            [tips_flag]: false,
            [page]: now_page
          })
        }
      }
    })
  }
})
