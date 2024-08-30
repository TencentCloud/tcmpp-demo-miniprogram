function request(params) {
  let url = params.url
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url,
      success: (res) => {
        if(typeof res === 'string'){
          reject([{}, err])
        } else {
          resolve([res.data || {}, null])
        }
      },
      fail: (err) => {
        reject([{}, err])
      }
    })
  }).catch(err => [{}, err])
}

const Mock = require('./mock.mp.min.js') // better-mock
const mockInfo = require('../mock/index.js');

Mock.mock('/api/hot', mockInfo().hotMovie);
Mock.mock('/api/movieDetail', ({ body }) => {
  const { movieId } = body;
  return mockInfo().movieDetail[movieId];
});
Mock.mock('/api/comments', ({ body }) => {
  const { movieId } = body;
  return mockInfo().comments[movieId];
});
Mock.mock('/api/moreComing', mockInfo().moreComingList);
Mock.mock('/api/comingList', mockInfo().comingList);
Mock.mock('/api/mostExpected', mockInfo().mostExpected);
Mock.mock('/api/seats', mockInfo().seats);
Mock.mock('/api/cinemas', mockInfo().cinemas);
Mock.mock('/api/cinemaDetail', ({ body }) => {
  const { cinemaId } = body;
  return mockInfo().cinemaDetail[cinemaId];
});
Mock.mock('/api/showdays', mockInfo().showdays);
Mock.mock('/api/searchMovie', ({ body }) => {
  const { kw, stype } = body;
  if(!kw) {
    return {
      movies: [],
      cinemas: []
    }
  }

  if(stype == 2) {
    // 搜索cinema
    return {
      movies: [],
      cinemas: mockInfo().cinemas.data.cinemas
    }
  }
  return {
    movies: mockInfo().hotMovie.hot,
    cinemas: mockInfo().cinemas.data.cinemas
  }
});
Mock.mock('/api/cities', mockInfo().cities);
Mock.mock('/api/videos', ({body}) => {
  const { movieId } = body;

  return mockInfo().videos[movieId];
});


module.exports = request;