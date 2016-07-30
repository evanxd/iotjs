# Thing.js
A framework provides easiest and fastiest way to build devices.

## Getting Started
Start to hack to light on an LED on a Raspberry Pi board.

### Include Thing.js
```js
var $ = require('thing-js');
```

### Define an LED module on the board
Add a new file called `board.json` and add the below JSON object into it to define the LED on the board.
```json
{
  "modules": {
    "led" : { "module": "Led", "pins": 44 }
  }
}
```

### Blink an LED
```js
$.led.blink(500);
```

## API Doc
Check [here][api-doc] to see the full API document.

[api-doc]: https://thing-js.github.io/doc
