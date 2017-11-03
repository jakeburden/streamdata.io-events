var events = require('events')
var util = require('util')
var streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node')
var AuthStrategy = require('streamdataio-js-sdk-auth')
var applyReducer = require('fast-json-patch').applyReducer

function Streamdata (url, appToken, headers, privateKey) {
  if (!(this instanceof Streamdata)) return new Streamdata(url, appToken, headers, privateKey)
  var self = this

  this._SSE = streamdataio.createEventSource(url, appToken, headers,
    AuthStrategy.newSignatureStrategy(appToken, privateKey))

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

