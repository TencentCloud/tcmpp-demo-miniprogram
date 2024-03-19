const utils = require('../utils')

// Executive context will expose a worker object in the context of the worker thread, and directly call the worker.onMessage/PostMessage
worker.onMessage(function (res) {
  console.log('fib onmessage:', res)
  if (res.type === 'execFunc_fib') {
    worker.postMessage({
      type: 'execFunc_fib',
      result: utils.fib(res.params[0])
    })
  }
})
