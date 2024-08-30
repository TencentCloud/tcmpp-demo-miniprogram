import util from '../../utils/index';
import { i18n, changeLang, getLang } from '../../i18n/lang'
const app = getApp()
Page({
  data: {
    language: '',
    t: i18n,
    languages: [
      {value: 'en_US', name: 'English'},
      {value: 'zh_CN', name: '中文'},
      {value: 'id_ID', name: 'Bahasa Indonesia'},
      {value: 'fr_FR', name: 'Français'}
    ]
  },
  onLoad(e){
    this.langUpdata();
    this.requestCart();
  },
  langUpdata() {
    wx.setNavigationBarTitle({
      title: i18n['全部服务']
    })
    this.setData({
      i18n,
      languages: this.data.languages.map(language => {
        return {
          ...language,
          checked: getLang() === language.value
        }
      })
    })
  },
  requestCart(e){
    util.request({
        url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
        mock: true,
      }).then((res)=>{
        const navData = res.data.navData;
        this.setData({
            navData,
        })
      })
},
  backIndex(e){
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    app.globalData.id=id
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },
  radioChange(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.languages
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      if(items[i].checked) {
        changeLang(items[i].value)
      }
    }

    this.setData({
      languages: items
    })
    wx.reLaunch({
      url: "/pages/index/index"
    });
  }
})