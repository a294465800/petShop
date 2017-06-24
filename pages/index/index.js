//index.js
//获取应用实例
let app = getApp()
//记录触摸位置
let start = 0
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    interval: 4000,
    duration: 500,
    userInfo: {},

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
      nav_flag: false
    },

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
          'http://stu.hyes.tyc.edu.tw/blog/gallery/236/3807-1111.jpg',
          'http://s2.buzzhand.net/uploads/d0/7/456525/14218526072156.jpg',
          'http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2Fa4%2F9e%2Fa49e049bc9aec44b9d7ee408d6450782.JPG'
        ]
      },
      {
        id: 1,
        name: '瑞文宠物',
        content: '五一寄养开始啦，有需要的用户联系起来~',
        avatar: '/images/head.jpg',
        img: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'http://stu.hyes.tyc.edu.tw/blog/gallery/236/3807-1111.jpg',
          'http://s2.buzzhand.net/uploads/d0/7/456525/14218526072156.jpg',
          'http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2Fa4%2F9e%2Fa49e049bc9aec44b9d7ee408d6450782.JPG'
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
        commentNumber: 156
      },

      {
        id: 1,
        userName: '小白',
        avatar: '/images/head.jpg',
        item: '疫苗',
        time: '2017/05/10',
        content: '瞬间爆炸',
        commentNumber: 22
      }
    ],

    //店家信息
    store: {
      id: 0,
      name: '瑞文宠物寄养中心',
      address: '广州市番禺区市桥街道',
      runtime: '9:00 - 20:00 全年无休',
      tel: '123-4567-8910',
      description: '我們是專業的犬舍，跟普通的寵物店大有不同。我們接受無數電視台和雜誌訪問，在犬展場上獲勝無數，所出售的優秀幼犬，經獸醫檢驗，不帶有遺傳問題。有14天健康合約保障。',
      imgs: [
        'http://www.okaydj.com/uploads/allimg/140313/1-140313130R4.jpg',
        'https://img.grouponcdn.com/deal/js6sX3YFGJHf3rW8fT8E/KC-700x400',
        'http://www.teepr.com/wp-content/uploads/2016/03/11040961_453333991524522_484123248141614718_o.jpg',
        'http://img1.100ye.com/img2/4/34/239/9051239/msgpic/35185982.jpg',
        'http://pet.zoneonezone.com/files/shop/img/1068/Pretty_Pet_Shop_Gallery_6.jpg'
      ]
    }
  },
  onLoad() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  //记录用户初次触摸屏幕位置
  touchStart(e) {
    start = e.touches[0].clientY
  },

  //根据动作判断隐藏轮播
  touchEnd(e) {
    const that = this
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    animation = animation.height(0).step()
    let end = e.changedTouches[0].clientY
    if (start > end) {
      that.setData({
        animationImg: animation.export()
      })
    }
  },

  //到达顶部出现轮播
  scrollTop(e) {
    const that = this
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    animation = animation.height('300rpx').step()
    that.setData({
      animationImg: animation.export(),
    })
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

  //swiper变动切换函数
  shiftPage(e) {
    const that = this
    that.setData({
      animationNav: that.animationNav(e.detail.current).export()
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
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      },
    })
  },

  //电话商家
  callStore() {
    console.log(1)
    const that = this
    wx.makePhoneCall({
      phoneNumber: that.data.store.tel,
    })
  },

  //商家图片预览
  preStoreImg(e) {
    const that = this
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: that.data.store.imgs,
    })
  }
})
