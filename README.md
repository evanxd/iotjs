# IoT.js
IoT.js is an IoT framework provides the easiest and fastest way to develop IoT applications with open hardware.

## Getting Started
Blink an LED without any JavaScript code.

### 1. Install IoT.js
```sh
npm install -g iotjs
```

### 2. Setup board.json
Add a new file `board.json` and add the below JSON object.
```json
{
  "modules": {
    "led" : { "module": "Led", "pins": 44 }
  },
  "extensions": {
    "iotjs-blink": { "modules": "led" }
  }
}
```

### 3. Run
```sh
iotjs
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
