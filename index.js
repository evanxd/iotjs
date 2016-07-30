'use strict';

var path = require('path');
var parentDir = path.dirname(module.parent.filename);
var board = require(parentDir + '/board.json');
var thingjs = {};

for (var id in board.modules) {
  var Module = require(module2filePath(board.modules[id].module));
  thingjs[id] = new Module(board.modules[id].pins);
}

function module2filePath (moduleName) {
  var fileName = '';
  for (var i = 0; i < moduleName.length; i++) {
    var character = moduleName.charAt(i);
    if (character === character.toLowerCase()) {
      fileName += character;
    } else {
      if (fileName === '') {
        fileName += character.toLowerCase();
      } else {
        fileName += '-' + character.toLowerCase();
      }
    }
  }
  return './lib/' + fileName;
}

module.exports = thingjs;
