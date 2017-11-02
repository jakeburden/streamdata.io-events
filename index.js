var events = require('events')
var util = require('util')
var streamdataio = require('streamdataio-js-sdk')
var applyReducer = require('fast-json-patch').applyReducer

function Streamdata (url, key, headers) {
  if (!(this instanceof Streamdata)) return new Streamdata(url, key, headers)
  var self = this

  this._SSE = streamdataio.createEventSource(url, key, headers)
  this._SSE
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

  this._SSE.open()

  this.on('close', function () {
    this._SSE.close()
    this.emit('end')
  })

  this.on('open', function () {
    this._SSE.open()
  })
}

util.inherits(Streamdata, events.EventEmitter)

Streamdata.prototype.close = function () {
  this.emit('close')
}

Streamdata.prototype.open = function () {
  this.emit('open')
}

module.exports = Streamdata

