var streamdata = require('./')

var url = 'https://www.reddit.com/r/random.json?obey_over18=true'
var key = 'ODRlZDNmYmUtMDAxZC00NWJmLTgwMzQtNTkzMWJiYjFhYjVj'

var SSE = streamdata(url, key)

SSE
  .on('data', function (data) {
    console.log('data', data)
  })
  .on('error', function (err) {
    console.error(err)
  })
  .on('end', function () {
    console.info('SSE has ended')
  })

// close SSE after 5 seconds
setTimeout(function () {
  SSE.close()
}, 5000)

// open SSE after 7 seconds
setTimeout(function () {
  SSE.open()
}, 7000)

// close SSE after 10 seconds
setTimeout(function () {
  SSE.close()
}, 10000)
