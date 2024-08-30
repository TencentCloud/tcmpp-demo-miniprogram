module.exports = function() {
    const language = wx.getSystemInfoSync().language;
    switch(language) {
        case 'en':
        case 'en-US':
        case 'en_US':
            return {
                hotMovie: require('./hot-en.js'),
                movieDetail: require('./movie-detail.js'),
                comments: require('./comment.js'),
                moreComingList: require('./more-coming-en.js'),
                seats: require('./seat-en.js'),
                mostExpected: require('./most-expected-en.js'),
                comingList: require('./coming-list-en.js'),
                cinemaDetail: require('./cinema-detail.js'),
                cinemas: require('./cinemas-en.js'),
                showdays: require('./showdays.js'),
                cities: require('./city.js'),
                videos: require('./video-list.js')
            }
        case 'zh':
        case 'zh-Hans':
        case 'zh-Hant':
        case 'zh_CN':
            return {
                hotMovie: require('./hot-zh.js'),
                movieDetail: require('./movie-detail.js'),
                comments: require('./comment.js'),
                moreComingList: require('./more-coming-zh.js'),
                seats: require('./seat-zh.js'),
                mostExpected: require('./most-expected-zh.js'),
                comingList: require('./coming-list-zh.js'),
                cinemaDetail: require('./cinema-detail.js'),
                cinemas: require('./cinemas-zh.js'),
                showdays: require('./showdays.js'),
                cities: require('./city.js'),
                videos: require('./video-list.js')
            }
        default:
            return {
                hotMovie: require('./hot-en.js'),
                movieDetail: require('./movie-detail.js'),
                comments: require('./comment.js'),
                moreComingList: require('./more-coming-en.js'),
                seats: require('./seat-en.js'),
                mostExpected: require('./most-expected-en.js'),
                comingList: require('./coming-list-en.js'),
                cinemaDetail: require('./cinema-detail.js'),
                cinemas: require('./cinemas-zh.js'),
                showdays: require('./showdays.js'),
                cities: require('./city.js'),
                videos: require('./video-list.js')
            }
    }
  }