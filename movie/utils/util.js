const i18n  = require('../i18n/index');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const getDayOrWeek = (date) => {
  if (date == null) return ''
                
  const dayArr = ['前天', '昨天', '今天', '明天', '后天']
                
  // 星期数组
  const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                
  const diffTime = (date.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000
                
  // 获取“前天/昨天/今天/明天/后天”，若不在这些里面则显示星期
  // i18n.t(dayArr[diffTime + 2]) || 
  return i18n.t(weekArr[date.getDay()])
}

const formatDay = date => {
  const time = new Date(date);
  let month = time.getMonth() + 1;
  let day = time.getDate();

  // `${month}`.length === 1 ? month = `0${month}` : month;
  // `${day}`.length === 1 ? day = `0${day}` : day;

  const dayOrWeek = getDayOrWeek(time);

  return `${dayOrWeek} ${i18n.t('{month}月{day}日', {
    month,
    day
  })}`;
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getToday = () => {
  const today = new Date()
  return formatTime(new Date()).split(' ')[0]
}

const calcTime = (time) => {
  if(!time){
    return
  }
  const day = new Date(time)
  const now = new Date()
  const result = now.getTime() - day.getTime()
  if (now.getFullYear() !== day.getFullYear()) {
    return time.split(' ')[0]
  }
  //一分钟前评论
  if (result < 60000) {
    return i18n.t('刚刚')
  }
  if (60000 <= result && result < 3600000) {
    return i18n.t('{minute}分钟前', {
      minute: Math.floor(result / 60000)
    })
  }
  if (3600000 <= result && result < 86400000){
    return i18n.t('{hour}小时前', {
      hour: Math.floor(result / 3600000)
    })
  }
  if (86400000 <= result && result < 604800000) {
    return i18n.t('{day}天前', {
      day: Math.floor(result / 86400000)
    })
  }
  return `${formatNumber(day.getMonth() + 1)}-${formatNumber(day.getDate())}`
 
}

//获取指定区间的随机整数
const getRandom = (lowerValue, upperValue,isFormat)=>{
  const num = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
  if (isFormat){
    return formatNumber(num);
  } else {
    return num
  }
}
//节流函数
const throttle = (func, interval=250)=> {
  let timeout;
  let startTime = new Date();
  return function (event) {
    clearTimeout(timeout);
    let curTime = new Date();
    if (curTime - startTime <= interval) {
      //小于规定时间间隔时，用setTimeout在指定时间后再执行
      timeout = setTimeout(() => {
        func.call(this,event);
      }, interval)
    } else {
      //重新计时并执行函数
      startTime = curTime;
      func.call(this, event);
    }
  }
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  getToday,
  calcTime,
  getRandom,
  throttle,
  formatDay
}