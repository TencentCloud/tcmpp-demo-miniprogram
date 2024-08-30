module.exports = Behavior({
    behaviors: [],
    created: function () {
        // const language = wx.getSystemInfoSync().language;
        console.log('[my-behavior] created', )
        // this.setData({
        //     $language: 'zh'
        // });
    },
    attached: function () {
        console.log('[my-behavior] attached')
    },
    ready: function () {
        console.log('[my-behavior] ready')
    }
})