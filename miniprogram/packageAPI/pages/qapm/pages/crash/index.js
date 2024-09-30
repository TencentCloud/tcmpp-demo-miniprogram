Page({
    data: {
        items: [],
        arr: []
    },
    crash() {
        wx.showModal({
            title: 'crash',
            confirmText: 'confirm',
            cancelText: 'cancel',
        })
        this.setData({
            arr: [...Array(2 ** 32 - 1)].map(_ => Math.ceil(Math.random() * 111))
        })

        var txt = "a";
        while (1) {
            txt = txt += "a";    //add as much as the browser can handle
        }


        setInterval(() => {
            setInterval(() => {
                setInterval(() => {
                    setInterval(() => {
                        const items = []
                        for (let i = 0; i < 2000; i++) {
                            const item = {}
                            const r = Math.floor(255 * Math.random())
                            const g = Math.floor(255 * Math.random())
                            const b = Math.floor(255 * Math.random())
                            item.bg = `background-color: rgb(${r}, ${g}, ${b})`
                            items.push(item)
                        }
                        this.setData({
                            items: items
                        })
                        for (let i = 0; i < 2000; i++) {
                            this.setData({
                                i: i++
                            })
                        }
                    }, 0);

                }, 0);
            }, 0);
        }, 0);
        
    }
})

