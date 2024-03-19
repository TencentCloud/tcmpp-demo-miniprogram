import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['pageScroll0'],
      path: 'packageAPI/pages/page/page-scroll/page-scroll'
    }
  },

  data: {
    toView: 'green',
    triggered: false,
    scrollEnabled: true,
    showScrollbar: true,
    pagingEnabled: false,
    bounces: true,
    fastDeceleration: false,
    decelerationDisabled: false,
    animated: true
  },

  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  scrollToBottom() {
    wx.pageScrollTo({
      scrollTop: 3000,
      duration: 300
    })
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  setScrollEnabled() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        const enable = !this.data.scrollEnabled;
        scrollView.scrollEnabled = enable;

        this.setData({
          scrollEnabled: enable
        });
        wx.showToast({
          icon: 'none',
          title: i18n['pageScroll1']
        });
      })
  },
  setScrollbarShow() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        const scrollbar = !this.data.showScrollbar
        scrollView.showScrollbar = scrollbar;

        this.setData({
          showScrollbar: scrollbar
        });
        wx.showToast({
          icon: 'none',
          title: i18n['pageScroll2']
        });
      })
  },
  setPagingEnabled() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        const enable = !this.data.pagingEnabled
        scrollView.pagingEnabled = enable;
        this.setData({
          pagingEnabled: enable
        })
        wx.showToast({
          icon: 'none',
          title: i18n['pageScroll3']
        });
      })
  },
  setBounces() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        const data = !this.data.bounces
        scrollView.bounces = data;

        this.setData({
          bounces: data
        })
        wx.showToast({
          icon: 'none',
          title: i18n['pageScroll4']
        });
      })
  },
  setFastDeceleration() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        const data = !this.data.fastDeceleration
        scrollView.fastDeceleration = data;

        this.setData({
          fastDeceleration: data
        })
        wx.showToast({
          icon: 'none',
          title: i18n['pageScroll5']
        });
      })
  },
  setDecelerationDisabled() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        const data = !this.data.decelerationDisabled
        scrollView.decelerationDisabled = data;

        this.setData({
          decelerationDisabled: data
        })
        wx.showToast({
          icon: 'none',
          title: i18n['pageScroll6']
        });
      })
  },
  scrollTo() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        scrollView.scrollTo({
          top: 30
        })
        wx.showToast({
          icon: 'none',
          title: i18n['pageScroll7']
        });
      })
  },

  setScrollToAnimation() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        const animation = !this.data.animated;

        this.setData({
          animated: animation
        })
        scrollView.scrollTo({
          top: 100,
          velocity: 30,
          animated: animation,
          duration: 2000
        });
      })
  },

  scrollIntoView() {
    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const scrollView = res[0].node;
        scrollView.scrollIntoView('#demo3')
      })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['pageScroll0']
    })
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
