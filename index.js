'use strict';

var path = require('path');
var util = require('./lib/util');
var parentDir = path.dirname(module.parent.filename);
var board = require(parentDir + '/board.json');
var thingjs = {};

for (var key in board.modules) {
  var Module = require('./lib/' + util.module2fileName(board.modules[key].module));
  thingjs[key] = new Module(board.modules[key].pins);
}

for (key in board.extensions) {
  var extension = require(key);
  var params = board.extensions[key];
  for (key in params) {
    if (key === 'modules') {
      params[key] = thingjs[params[key]];
    }
  }
  extension.run(params);
}

module.exports = thingjs;
