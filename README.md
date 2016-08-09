# Thing.js
Thing.js is a framework provides the fastest and easiest way to develop applications for open hardware devices.

## Getting Started
Blink an LED without any JavaScript code.

### 1. Install Thing.js
```sh
npm install thing-js
```

### 2. Setup board.json
Add a new file `board.json` and add the below JSON object.
```json
{
  "modules": {
    "led" : { "module": "Led", "pins": 44 }
  },
  "extensions": {
    "thingjs-blink": { "modules": "led" }
  }
}
```

### 3. Run
```sh
~/path/to/thing-js/thingjs
```

## API Documentation
Check the [API documentation][api-doc] to see how to control hardware modules on a dev board.

## Supported Boards
* [Raspberry Pi][rpi]
* [Linkit Smart 7688 (Duo)][linkit7688]

## Maintainers
* [Evan Tseng](http://evanxd.io)

[api-doc]: https://thing-js.github.io/doc
[rpi]: https://www.raspberrypi.org
[linkit7688]: https://labs.mediatek.com/site/global/developer_tools/mediatek_linkit_smart_7688/whatis_7688/index.gsp
