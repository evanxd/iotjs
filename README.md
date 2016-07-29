# Thing.js
A framework provides easiest and fastiest way to build devices.

## Get Started
Start to hack to light on an LED on a Raspberry Pi board.

### Include Thing.js
```
var $ = require('thing-js');
```

### Define the modules on the board
Add a new file called `board.json` and add the below JSON object.
```
{
  "model": "rpi",
  "modules": {
    "led" :   { "module": "LED", "pin": 12 }
  }
}
```

### Blink an LED
```
$.led.blink(500);
```

## API Doc
Check [here][api-doc] to see the full API document.

[api-doc]: https://thing-js.github.io/doc
