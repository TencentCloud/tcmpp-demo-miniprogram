import { i18n,lang } from '../../../../../i18n/lang'
const util = {}
// const { formatDateTime } = require('../../../../util/util')
Date.prototype.Format = function (fmt) {
  const o = {
    'M+': this.getMonth() + 1, // Month
    'd+': this.getDate(), // Day
    'h+': this.getHours(), // Hour
    'm+': this.getMinutes(), // Minute
    's+': this.getSeconds(), // Second
    'q+': Math.floor((this.getMonth() + 3) / 3), // Quarter
    S: this.getMilliseconds() // Millisecond
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

util.renderName = (name) => {
  switch (name) {
  case 'appLaunch':
    return i18n['performance7']
  case 'firstRender':
    return i18n['performance8']
  case 'route':
    return i18n['performance9']
  case 'evaluateScript':
    return i18n['performance10']
  }
}

util.renderEntryType = (entryType) => {
  switch (entryType) {
  case 'navigation':
    return i18n['performance11']
  case 'render':
    return i18n['performance12']
  case 'script':
    return i18n['performance13']
  }
}

util.renderDuration = (duration) => (duration ? duration + 'ms' : '')

util.renderStartTime = (startTime) => {
  if (!startTime) return ''
  const date = new Date(startTime)
  return date.Format('yyyy-MM-dd hh:mm:ss')
}

module.exports = util
