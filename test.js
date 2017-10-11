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

// close SSE after 5 seconds 
setTimeout(function () {
  SSE.close()
}, 5000)
