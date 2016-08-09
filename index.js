'use strict';

var parser = require('./lib/board-parser');
var path = require('path');
var parentDir = path.dirname(module.parent.filename);
var board = require(parentDir + '/board.json');
var modules = parser.parse(board);

module.exports = {
  modules:    modules,
  DustSensor: require('./module/dust-sensor'),
  Led:        require('./module/led'),
  Switch:     require('./module/switch')
};
