'use strict';

var fs = require('fs');

var util = {
  getModules: function(board) {
    var thingjs = {};

    // Handle the "modules" part of board.json file.
    for (var key in board.modules) {
      var Module = require('../module/' + util.module2fileName(board.modules[key].module));
      thingjs[key] = new Module(board.modules[key].pins);
      thingjs[key].id = key;
    }

    // Handle the "extensions" part of board.json file.
    for (key in board.extensions) {
      var extension;
      var extensionParams = board.extensions[key];
      try {
        if (this.is3rdPartyModuleExisted(key)) {
          // Load 3rd-party extension.
          extension = require(key);
        } else {
          // Load built-in extension.
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

  is3rdPartyModuleExisted: function(moduleName) {
    return this.isModuleExisted(moduleName);
  },

  isBuiltInModuleExisted: function(moduleName) {
    return this.isModuleExisted(moduleName, '../extension');
  },

  isModuleExisted: function(moduleName, paths) {
    var isExisted = false;
    paths = paths || module.paths;
    paths = Array.isArray(paths) ? paths : [paths];
    module.paths.forEach(function(path){
      if (fs.existsSync(path + '/' + moduleName)) {
        isExisted = true;
        return false;
      }
    });
    return isExisted;
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
