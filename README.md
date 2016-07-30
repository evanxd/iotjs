# Thing.js
A framework provides easiest and fastiest way to build devices.

## Getting Started
Start to hack to light on an LED on a Raspberry Pi board.

### Install Thing.js
```sh
npm install thing-js
```

### Blink an LED without Code
Add a new file called `board.json` and add the below JSON object into it to define the LED on the board.
```json
{
  "modules": {
    "led" : { "module": "Led", "pins": 44 }
  },
  "extensions": {
    "thingjs-blink": { "modules": "led", interval": 500 }
  }
}
```

### Run
```
./node_modules/thing-js/thingjs.js
```

## API Doc
Check [here][api-doc] to see the full API document.

[api-doc]: https://thing-js.github.io/doc
