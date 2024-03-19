import CustomPage from './base/CustomPage'
const App = getApp()

const txts = [
  ['Mini ', 'Program ', 'is ', 'very ', 'fast ', 'and ', 'strong'],
  ['he ', 'can ', 'do ', 'more ', 'things ', 'than ', 'your ', 'thinking, ', 'because ', 'it\'s ', 'born ', 'own ', 'for ', 'that ', 'make ', 'better ', 'user ', 'experience ', 'and ', 'better ', 'life '],
  ['Looking ', 'forward ', 'to ', 'meeting ']
]

CustomPage({
  data: {
    txt1: [],
    txt2: [],
    txt3: []
  },
  waitDo: (txt) => new Promise(resolve => setTimeout(() => resolve(txt), 102)),
  async onShow() {
    if (!this.showed) {
      this.showed = true;
      for (const [line] of txts.entries()) {
        const dKey = "txt" + (line + 1);
        for (let word of txts[line]) {
          const list = this.data[dKey];
          word = await this.waitDo(word);
          list.push(word);
          this.setData({
            [dKey]: list
          })
        }
      }
    }
  },
  onShareAppMessage() {
    return {
      title: 'Extension',
      path: 'page/extend/index'
    }
  },
  themeToggle() {
    if (App.themeChanged) {
      if (App.globalData.theme === 'light') {
        App.themeChanged('dark')
      } else {
        App.themeChanged('light')
      }
    }
  }
})
