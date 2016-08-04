'use strict';

var fs = require('fs');

var util = {
  handleBoardJson: function(board) {
    var thingjs = {};

    // Handle the "modules" part of board.json file.
    for (var key in board.modules) {
      var Module = require('../lib/' + util.module2fileName(board.modules[key].module));
      thingjs[key] = new Module(board.modules[key].pins);
      thingjs[key].id = key;
    }

    // Handle the "extensions" part of board.json file.
    for (key in board.extensions) {
      var extension;
      var extensionParams = board.extensions[key];
      // Load the extension.
      try {
        if (this.isModuleAvailable(key)) {
          extension = require(key);
        } else {
          extension = require('../extension/' + key);
        }
      } catch(e) {
        console.error(e.message);
      }
      // Trigger the extension start point method with the params.
      var params = { modules: [] };
      for (key in extensionParams) {
        if (key === 'modules') {
          var modules = extensionParams.modules;
          modules = Array.isArray(modules) ? modules : [modules];
          modules.forEach(function(_module) {
            params.modules.push(thingjs[_module]);
          });
        } else {
          params[key] = extensionParams[key];
        }
      }
      extension.run(params);
    }

    return thingjs;
  },

  isModuleAvailable: function(moduleName) {
    var isAvailable = false;
    module.paths.forEach(function(path){
      if (fs.existsSync(path + '/' + moduleName)) {
        isAvailable = true;
        return false;
      }
    });
    return isAvailable;
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
