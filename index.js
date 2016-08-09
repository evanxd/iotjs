'use strict';

var path = require('path');
var parser = require('./lib/board-parser');
var parentDir = path.dirname(module.parent.filename);
var board = require(parentDir + '/board.json');

module.exports = {
  modules:    parser.getModules(board),
  DustSensor: require('./module/dust-sensor'),
  Led:        require('./module/led'),
  Switch:     require('./module/switch')
};
