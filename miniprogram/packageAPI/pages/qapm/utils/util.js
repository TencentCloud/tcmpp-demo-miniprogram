const { jsonData } = require('./data')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const longTask = (num = 1000) => {
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      for (var k = 0; k < num; k++) {
        var a = JSON.parse(JSON.stringify(jsonData))
      }
    }
  }
}

module.exports = {
  formatTime: formatTime,
  sleep,
  longTask
}