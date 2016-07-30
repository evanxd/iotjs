'use strict';

var util = {
  handleBoardJson: function(board) {
    var thingjs = {};

    for (var key in board.modules) {
      var Module = require('../lib/' + util.module2fileName(board.modules[key].module));
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

    return thingjs;
  },

  module2fileName: function (moduleName) {
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
    return fileName;
  }
};

module.exports = util;
