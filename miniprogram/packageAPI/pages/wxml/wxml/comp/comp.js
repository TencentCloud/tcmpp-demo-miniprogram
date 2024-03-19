import { i18n,lang } from '../../../../../i18n/lang'
Component({
  data: {
    t: i18n,
    lang,
    element: '--',
    elementIn: '--'
  },
  ready(){
    this.setData({
      t: i18n,
      lang
    })
  },
  methods: {
    selectQuery (){
      // Find all nodes
      const query = wx.createSelectorQuery()
      query.selectAll('.demo').boundingClientRect((rect) => {
        console.log('==== Found all .demo nodes', rect)
        const elements = rect.map((item => item.id))
        this.setData({
          element: String(elements)
        })
      }).exec()
    },
    selectQueryInComp (){
      // Find nodes within the component
      const query = wx.createSelectorQuery().in(this)
      query.selectAll('.demo').boundingClientRect((rect) => {
        console.log('==== Found .demo nodes within the component', rect)
        const elements = rect.map((item => item.id))
        this.setData({
          elementIn: String(elements)
        })
      }).exec()
    }
  }
})