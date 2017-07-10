//index.js
//获取应用实例
let app = getApp()

Page({
  data: {
    shop: app.globalData.shop,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
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

    //用户评论
    user_comments: null,
    comments_left: 200,
    comment_hide: true,

    //模拟数据
    //商家动态
    shops: [
      {
        id: 0,
        name: '瑞文宠物',
        content: '五一寄养开始啦，有需要的用户联系起来~',
        avatar: '/images/head.jpg',
        img: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'http://img5.duitang.com/uploads/item/201508/30/20150830052842_dGEfi.thumb.700_0.jpeg',
          'http://s2.buzzhand.net/uploads/d0/7/456525/14218526072156.jpg',
          'http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2Fa4%2F9e%2Fa49e049bc9aec44b9d7ee408d6450782.JPG'
        ],
        comments: [
          {
            id: 0,
            name: '路人甲',
            content: '可以，很喜欢！'
          }
        ]
      },
      {
        id: 1,
        name: '瑞文宠物',
        content: '五一寄养开始啦，有需要的用户联系起来~',
        avatar: '/images/head.jpg',
        img: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'http://img5.duitang.com/uploads/item/201508/30/20150830052842_dGEfi.thumb.700_0.jpeg',
          'http://s2.buzzhand.net/uploads/d0/7/456525/14218526072156.jpg',
          'http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2Fa4%2F9e%2Fa49e049bc9aec44b9d7ee408d6450782.JPG'
        ],
        comments: [
          {
            id: 0,
            name: '路人甲',
            content: '可以，很喜欢！'
          },
          {
            id: 1,
            name: '路人甲',
            content: '很期待'
          }
        ]
      }
    ],

    //用户评论
    comments: [
      {
        id: 0,
        userName: '小郭小郭小郭小郭小郭小郭',
        avatar: '/images/head.jpg',
        item: '洗澡',
        time: '2017/05/16',
        content: '医生人很帅，也很健谈，感觉很靠谱',
        commentNumber: 156,
        score: 2
      },

      {
        id: 1,
        userName: '小白',
        avatar: '/images/head.jpg',
        item: '疫苗',
        time: '2017/05/10',
        content: '瞬间爆炸',
        commentNumber: 22,
        score: 4
      },
      {
        id: 0,
        userName: '小郭小郭小郭小郭小郭小郭',
        avatar: '/images/head.jpg',
        item: '洗澡',
        time: '2017/05/16',
        content: '医生人很帅，也很健谈，感觉很靠谱',
        commentNumber: 156,
        score: 2
      },

      {
        id: 1,
        userName: '小白',
        avatar: '/images/head.jpg',
        item: '疫苗',
        time: '2017/05/10',
        content: '瞬间爆炸',
        commentNumber: 22,
        score: 4
      },
      {
        id: 0,
        userName: '小郭小郭小郭小郭小郭小郭',
        avatar: '/images/head.jpg',
        item: '洗澡',
        time: '2017/05/16',
        content: '医生人很帅，也很健谈，感觉很靠谱',
        commentNumber: 156,
        score: 2
      },

      {
        id: 1,
        userName: '小白',
        avatar: '/images/head.jpg',
        item: '疫苗',
        time: '2017/05/10',
        content: '瞬间爆炸',
        commentNumber: 22,
        score: 4
      },
    ],

    //店家信息
    store: {
      id: 0,
      name: '瑞文宠物寄养中心',
      address: '广州市番禺区市桥街道',
      runtime: '9:00 - 20:00 全年无休',
      tel: '123-4567-8910',
      description: '我們是專業的犬舍，跟普通的寵物店大有不同。我們接受無數電視台和雜誌訪問，在犬展場上獲勝無數，所出售的優秀幼犬，經獸醫檢驗，不帶有遺傳問題。有14天健康合約保障。我們是專業的犬舍，跟普通的寵物店大有不同。我們接受無數電視台和雜誌訪問，在犬展場上獲勝無數，所出售的優秀幼犬，經獸醫檢驗，不帶有遺傳問題。有14天健康合約保障。我們是專業的犬舍，跟普通的寵物店大有不同。我們接受無數電視台和雜誌訪問，在犬展場上獲勝無數，所出售的優秀幼犬，經獸醫檢驗，不帶有遺傳問題。有14天健康合約保障。我們是專業的犬舍，跟普通的寵物店大有不同。我們接受無數電視台和雜誌訪問，在犬展場上獲勝無數，所出售的優秀幼犬，經獸醫檢驗，不帶有遺傳問題。有14天健康合約保障。我們是專業的犬舍，跟普通的寵物店大有不同。我們接受無數電視台和雜誌訪問，在犬展場上獲勝無數，所出售的優秀幼犬，經獸醫檢驗，不帶有遺傳問題。有14天健康合約保障。',
      imgs: [
        'http://www.okaydj.com/uploads/allimg/140313/1-140313130R4.jpg',
        'https://img.grouponcdn.com/deal/js6sX3YFGJHf3rW8fT8E/KC-700x400',
        'http://www.teepr.com/wp-content/uploads/2016/03/11040961_453333991524522_484123248141614718_o.jpg',
        'http://img1.100ye.com/img2/4/34/239/9051239/msgpic/35185982.jpg',
        'http://pet.zoneonezone.com/files/shop/img/1068/Pretty_Pet_Shop_Gallery_6.jpg'
      ]
    },
  },
  onLoad() {
    let that = this

    let arr = []
    //评论星数数量
    arr.length = 5
    that.setData({
      star_count: arr
    })
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo,
    //     star_count: arr
    //   })
    // })
    // wx.request({
    //   url: app.globalData.host + 'moments',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'AppVersion': app.globalData.version,
    //     'storeNumber': app.globalData.storeNumber
    //   },
    //   success: res => {
    //   }
    // })
    // app.getSetting((userInfo) => {
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },

  onShow() {
    const that = this
    that.setData({
      shop: app.globalData.shop,
    })
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

  //禁止轮播触摸移动
  stopMove() {
    return false
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
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: res => {
    //   },
    // })
    let latitude = 23.138595
    let longitude = 113.328032
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,
      name: '广州天河又一城',
      address: '广州市xxxxxxxx',
      success: res => {
        wx.hideLoading()
      }
    })
  },

  //电话商家
  callStore() {
    const that = this
    wx.makePhoneCall({
      phoneNumber: that.data.store.tel,
    })
  },

  //商家图片预览
  preStoreImg(e) {
    const that = this
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: that.data.store.imgs,
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

  //评论框拉起
  pullComment() {
    const that = this
    if (that.data.comment_hide) {
      that.setData({
        comment_hide: false
      })
    } else {
      that.setData({
        comment_hide: true
      })
    }
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
  }
})
