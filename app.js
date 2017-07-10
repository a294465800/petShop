//app.js
App({
  onLaunch() {
    const that = this
    // wx.request({
    //   url: that.globalData.host + 'store',
    //   header: that.globalData.header,
    //   success: res => {
    //     if (200 == res.data.code) {
    //       that.globalData.shop = res.data.data
    //     } else {
    //       wx.showModal({
    //         title: '提示',
    //         content: '该小程序已经关闭',
    //       })
    //     }
    //   }
    // })
    that.getSetting()
  },

  // getUserInfo(cb) {
  //   const that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.getUserInfo({
  //       withCredentials: false,
  //       success: (res) => {
  //         that.globalData.userInfo = res.userInfo
  //         typeof cb == "function" && cb(that.globalData.userInfo)
  //       }
  //     })
  //   }
  // },

  globalData: {
    userInfo: null,
    host: 'https://www.sennkisystem.cn/api/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'AppVersion': '4.0',
      'storeNumber': '1400344af3767f15f957ff6c4d7c3f2c'
    },
    shop: null
  },

  //获取用户设置
  getSetting(cb) {
    let that = this
    wx.showLoading({
      title: '登录中',
    })
    wx.getSetting({
      success: setting => {
        if (setting.authSetting["scope.userInfo"] == true) {
          //调用登录接口
          wx.login({
            withCredentials: true,
            success: rs => {
              wx.getUserInfo({
                success: res => {
                  wx.request({
                    url: that.globalData.host + 'oauth/login',
                    method: 'POST',
                    header: that.globalData.header,
                    data: {
                      code: rs.code,
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    },
                    success: e => {
                      wx.hideLoading()
                      if (!e.header) {
                        wx.showModal({
                          title: '提示',
                          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
                          showCancel: false
                        })
                      } else if (200 != e.data.code) {
                        wx.showToast({
                          title: '登录失败',
                        })
                      } else {
                        that.globalData.header.Cookie = e.header['Set-Cookie'].split(";")[0]
                        if (0 == (e.data.data.register ? e.data.data.register : 1)) {
                          wx.showModal({
                            title: '提示',
                            content: '你还没有绑定手机号码？',
                            confirmText: '确认绑定',
                            success: res => {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: '/pages/tel_input/tel_input',
                                })
                              }
                            }
                          })
                        } else {
                          that.checkLogin()
                        }
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  checkLogin(cb) {
    const that = this
    wx.request({
      url: that.globalData.host + 'auth/check',
      header: that.globalData.header,
      success: res => {
        if (200 == res.data.code) {
          // wx.setStorage({
          //   key: 'LaravelID',
          //   data: e.header['Set-Cookie'].split(";")[0],
          // })
          if (that.globalData.userInfo) {
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
          else {
            that.globalData.userInfo = res.data.data
            // that.globalData.LaravelID = e.header['Set-Cookie'].split(";")[0]
            wx.showToast({
              title: '登录成功',
            })
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        } else {
          wx.showToast({
            title: '登录失败',
          })
        }
      },
      error: () => {
        wx.showToast({
          title: '登录失败',
        })
      }
    })
  }

  // //直接登录
  // Login() {
  //   const that = this
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting["scope.userInfo"] == true) {
  //         wx.request({
  //           url: that.globalData.host + 'checkLogin',
  //           method: 'post',
  //           header: {
  //             'content-type': 'application/x-www-form-urlencoded',
  //             'Cookie': that.globalData.LaravelID
  //           },
  //           success: rs => {
  //             if (200 == rs.data.code) {
  //               that.globalData.userInfo = rs.data.data
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  // getUserInfo(cb) {
  //   let that = this
  //   //调用登录接口
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting["scope.userInfo"] == true) {
  //         wx.login({
  //           withCredentials: true,
  //           success: rs => {
  //             wx.getUserInfo({
  //               success: res => {
  //                 wx.request({
  //                   url: that.globalData.host + 'login',
  //                   method: 'post',
  //                   data: {
  //                     code: rs.code,
  //                     encryptedData: res.encryptedData,
  //                     iv: res.iv
  //                   },
  //                   success: e => {
  //                     if (!e.header) {
  //                       wx.showModal({
  //                         title: '提示',
  //                         content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
  //                         showCancel: false
  //                       })
  //                       return
  //                     }
  //                     wx.request({
  //                       url: that.globalData.host + 'checkLogin',
  //                       method: 'post',
  //                       header: {
  //                         'content-type': 'application/x-www-form-urlencoded',
  //                         'Cookie': e.header['Set-Cookie'].split(";")[0]
  //                       },
  //                       success: res => {
  //                         if (200 == res.data.code) {
  //                           wx.setStorage({
  //                             key: 'LaravelID',
  //                             data: e.header['Set-Cookie'].split(";")[0],
  //                           })
  //                           wx.showToast({
  //                             title: '登录成功',
  //                           })
  //                           that.globalData.LaravelID = e.header['Set-Cookie'].split(";")[0]
  //                           that.globalData.userInfo = res.data.data
  //                           typeof cb == "function" && cb(that.globalData.userInfo)
  //                         } else {
  //                           wx.showToast({
  //                             title: '登录失败',
  //                           })
  //                         }
  //                       }
  //                     })
  //                   }
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
})
