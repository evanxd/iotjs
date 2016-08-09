'use strict';

var util = require('./util');

var boardParser = {
  getModules: function(board) {
    var modules = {};

    // Handle the "modules" part of board.json file.
    for (var key in board.modules) {
      var Module = require('../module/' + util.module2fileName(board.modules[key].module));
      modules[key] = new Module(board.modules[key].pins);
      modules[key].id = key;
    }

    // Handle the "extensions" part of board.json file.
    for (key in board.extensions) {
      var extension;
      var extensionParams = board.extensions[key];
      try {
        if (util.is3rdPartyModuleExisted(key)) {
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
          var moduleNames = extensionParams.modules;
          moduleNames = Array.isArray(moduleNames) ? moduleNames : [moduleNames];
          moduleNames.forEach(function(name) {
            params.modules.push(modules[name]);
          });
        } else {
          params[key] = extensionParams[key];
        }
      }
      extension.run(params);
    }

    return modules;
  }
}

module.exports = boardParser;
