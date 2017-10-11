var events = require('events')
var util = require('util')
var streamdataio = require('streamdataio-js-sdk')
var applyReducer = require('fast-json-patch').applyReducer

function Streamdata (url, key) {
  if (!(this instanceof Streamdata)) return new Streamdata(url, key)
  var self = this

  this.streamd = streamdataio.createEventSource(url, key)
  this.streamd
    .onData(function (data) {
      this.doc = data
      self.emit('data', data)
    })
    .onPatch(function (patch) {
      self.emit('patch', patch)
      this.doc = patch.reduce(applyReducer, this.doc)
      self.emit('data', this.doc)
    })
    .onError(function (err) {
      self.emit('error', new Error(err))
    })
    .onOpen(function () {
      self.emit('opened')
    })

  this.streamd.open()

  this.on('close', function () {
    this.streamd.close()
  })

  this.on('open', function () {
    this.streamd.open()
  })
}

util.inherits(Streamdata, events.EventEmitter)

Streamdata.prototype.close = function () {
  this.streamd.close()
}

Streamdata.prototype.open = function () {
  this.streamd.open()
}

module.exports = Streamdata

