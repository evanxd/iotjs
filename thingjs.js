#!/usr/bin/env node

var path = require('path');
var util = require('./lib/util');
// FIXME: Hard code the path of board.json.
var board = require('../../board.json');
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
