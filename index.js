'use strict';

var parser = require('./lib/device-parser');
var path = require('path');
var parentDir = path.dirname(module.parent.filename);
// Parse the `device.json` file by default.
var device = require(parentDir + '/device.json');
var modules = parser.parse(device);

module.exports = {
  modules:     modules,
  DustSensor:  require('./module/dust-sensor'),
  Led:         require('./module/led'),
  Switch:      require('./module/switch'),
  TelegramBot: require('node-telegram-bot-api')
};
