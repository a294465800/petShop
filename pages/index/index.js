//index.js
//获取应用实例
let app = getApp()
let timer_img = null
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
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg'
        ]
      },
      {
        id: 1,
        name: '瑞文宠物',
        content: '五一寄养开始啦，有需要的用户联系起来~',
        avatar: '/images/head.jpg',
        img: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498243041784&di=0da5739e9ef474746938dc78ec91629b&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv4%2F18%2Fd%2F97.jpg'
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
    ]
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
    clearTimeout(timer_img)
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
      // timer_img = setTimeout(() => {
      //   that.setData({
      //     'flag.nav_flag': true,
      //   })
      // }, 200)
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
      // 'flag.nav_flag': false,
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
  preImg(e){
    wx.previewImage({
      current: e.currentTarget.dataset.id,
      urls: e.currentTarget.dataset.imggup,
    })
  }
})
