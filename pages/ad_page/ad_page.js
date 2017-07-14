// ad_page.js
Page({
  data: {
    content: null
  },

  onLoad(options) {
    const that = this
    that.setData({
      content: options.content
    })
  },
})