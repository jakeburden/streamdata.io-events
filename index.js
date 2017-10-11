var events = require('events')
var streamdataio = require('streamdataio-js-sdk')
var applyReducer = require('fast-json-patch').applyReducer

function Streamdata (url, key) {
  if (!(this instanceof Streamdata)) return new Streamdata(url, key)
  var bus = new events.EventEmitter()

  var streamd = streamdataio.createEventSource(url, key)
  streamd
    .onData(function (data) {
      this.doc = data
      bus.emit('data', data)
    })
    .onPatch(function (patch) {
      bus.emit('patch', patch)
      this.doc = patch.reduce(applyReducer, this.doc)
      bus.emit('data', this.doc)
    })
    .onError(function (err) {
      bus.emit('error', new Error(err))
    })
    .onOpen(function () {
      bus.emit('opened')
    })

  streamd.open()

  bus.on('close', function () {
    streamd.close()
  })

  bus.on('open', function () {
    streamd.open()
  })

  return bus
}


module.exports = Streamdata

