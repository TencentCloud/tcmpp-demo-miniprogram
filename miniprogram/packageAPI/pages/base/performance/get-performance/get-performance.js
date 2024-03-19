// miniprogram/page/API/pages/get-performance/get-performance.js
const util = require('./util')
const performance = wx.getPerformance ? wx.getPerformance() : {}
const performanceObserver = performance.createObserver ? performance.createObserver((entryList) => {
  console.log('entryList of createObserver callback===', entryList.getEntries())
  console.log('entryList getEntriesByName===', entryList.getEntriesByName('firstPaint', 'render'))
  console.log('entryList getEntriesByType===', entryList.getEntriesByType('render'))
}) : null

import { i18n,lang } from '../../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Cyclical cache',
      path: 'packageAPI/pages/performance/get-performance/get-performance'
    }
  },
  data: {
    theme: 'light',
    array: [],
    support: false
  },
  onUnload() {
    if (wx.offThemeChange) {
      wx.offThemeChange()
    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['performance6']
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
    console.log('canIUse:getPerformance:', wx.canIUse('getPerformance'))
    let canIUse = false
    if (wx.getPerformance) {
      canIUse = true
    }
    this.setData({
      support: canIUse
    })
  },
  getPerformanceInfo() {
    console.log('Set performance buffer size to 35')
    performance.setBufferSize(35)
    console.log('performance===', performance)
    const EntryList = performance.getEntries()
    console.log('PerformanceEntryArray===', EntryList)
    console.log('getEntriesByName===', performance.getEntriesByName('firstPaint', 'render'))
    console.log('getEntriesByType===', performance.getEntriesByType('render'))
    const array = []
    EntryList.forEach((item) => {
      array.push({
        entryType: util.renderEntryType(item.entryType),
        name: util.renderName(item.name),
        duration: util.renderDuration(item.duration),
        startTime: util.renderStartTime(item.startTime)
      })
    })
    this.setData({
      array
    })
  },

  startObserver() {
    console.log('performanceObserver===', performanceObserver)
    // Surveillance required performance indicators
    performanceObserver.observe({ entryTypes: ['render', 'script', 'navigation'] })
  },

  stopObserver() {
    // End the monitoring
    performanceObserver.disconnect()
  }
})
