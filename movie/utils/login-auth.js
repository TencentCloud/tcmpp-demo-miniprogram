const oldPage = Page;
const authPage = [
    'pages/subPages/movie-order/movie-order',
    'pages/subPages/snack-order/snack-order',
    'pages/subPages/select-seat/select-seat',
    'pages/subPages/buy-snack/buy-snack',
    'pages/subPages/select-cinema/select-cinema',
]

Page = function (pageParams) {
    const {
        onLoad,
    } = pageParams;

    pageParams.onLoad = async function (params) {
        const app = getApp();
        const pages = getCurrentPages(); //获取加载的页面
        const currentPage = pages[pages.length - 1]; //获取当前页面的对象

        if(!app.globalData.userInfo && authPage.indexOf(currentPage.route) !== -1) {
            app.globalData.setCallbackUrl().then(() => {
                wx.redirectTo({
                    url: '/pages/subPages/login/login'
                });
            });
        } else {
            onLoad && onLoad.call(this, params);
        }
    };
   
    return oldPage(pageParams);
};