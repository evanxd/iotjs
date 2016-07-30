'use strict';

var path = require('path');
var util = require('./lib/util');
var parentDir = path.dirname(module.parent.filename);
var board = require(parentDir + '/board.json');
var thingjs = util.handleBoardJson(board);

module.exports = thingjs;
