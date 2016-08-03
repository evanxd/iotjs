# Thing.js
This framework provides the easiest and fastest way to develop applications for open hardware devices.

## Getting Started
Light the LED on a dev board.

### 1. Install Thing.js
```sh
npm install thing-js
```

### 2. Blink an LED without code
Add a new file `board.json` and add the below JSON object to blink the LED.
```json
{
  "modules": {
    "led" : { "module": "Led", "pins": 44 }
  },
  "extensions": {
    "hello-world": { "modules": "led" }
  }
}
```

### 3. Run
```sh
~/path/to/thing-js/thingjs
```

## API Documentation
Check [here][api-doc] to see the full API documentation.

## Supported Boards
* [Raspberry Pi][rpi]
* [Linkit Smart 7688 (Duo)][linkit7688]

## Maintainers
* [Evan Tseng](http://evanxd.io)

[api-doc]: https://thing-js.github.io/doc
[rpi]: https://www.raspberrypi.org
[linkit7688]: https://labs.mediatek.com/site/global/developer_tools/mediatek_linkit_smart_7688/whatis_7688/index.gsp
