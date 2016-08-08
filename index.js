'use strict';

var path = require('path');
var util = require('./lib/util');
var parentDir = path.dirname(module.parent.filename);
var board = require(parentDir + '/board.json');

module.exports = {
  modules:    util.getModules(board),
  DustSensor: require('./module/dust-sensor'),
  Led:        require('./module/led'),
  Switch:     require('./module/switch')
};
