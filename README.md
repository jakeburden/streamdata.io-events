# streamdata.io-events

> events API layer on top of streamdata

Events based API layer around [`streamdataio-js-sdk`](https://github.com/streamdataio/streamdataio-js-sdk) that handles `JSON Patch` by using [`fast-json-patch`](https://github.com/Starcounter-Jack/JSON-Patch).

## Usage

_note: this currently only works in the browser, would be cool to have it working in node.js soon!_

```js
var streamdata = require('streamdata.io-events')

var url = 'https://www.reddit.com/r/random.json?obey_over18=true'
var key = 'API key from https://streamdata.io/' // 🔑

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
```


## API

```js
var streamdata = require('streamdata.io-events')
var SSE = streamdata(url, key)
```

`streamdata.io-events` is an event emitter!


### `SSE.on('data', callback(data))`

Occurs whenever a full JSON doc is available.  Is called when the SSE opens, and whenever a `JSON Patch` gets applied to the previous exisiting JSON doc. Uses `fast-json-patch` internally.


### `SSE.on('error', callback(err))`
Occurs whenever the SSE returns an error, sends an `Error` object in the callback.


### `SSE.on('patch', callback(patch))`
Occurs whenever a new patch becomes available. Use this if you want to have access to the patch directly. Normally you can just listen for the `data` event as it will pass you a patched JSON doc by using `fast-json-patch` internally.

### `SSE.on('opened', callback())`
Occurs whenever the stream is opened.

### `SSE.emit('open') || SSE.open()`
Opens the stream (is called automatically once when the SSE is instantiated).

### `SSE.emit('close') || SSE.close()`
Closes the stream.



## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install streamdata.io-events
```

## Acknowledgments

streamdata.io-events was inspired by https://streamdata.io/

## See Also

- [`streamdataio/streamdataio-js-sdk`](https://github.com/streamdataio/streamdataio-js-sdk)
- [`Starcounter-Jack/JSON-Patch`](https://github.com/Starcounter-Jack/JSON-Patch)

## License

MIT License
Copyright (c) 2017 Jake Burden

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

