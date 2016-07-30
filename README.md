# Thing.js
A framework provides easiest and fastiest way to build devices.

## Getting Started
Start to hack to light on an LED on a dev board.

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
    "thingjs-blink": { "modules": "led", "interval": 500 }
  }
}
```

### 3. Run
```sh
./node_modules/thing-js/thingjs
```

## API Doc
Check [here][api-doc] to see the full API document.

[api-doc]: https://thing-js.github.io/doc
