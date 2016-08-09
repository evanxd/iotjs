'use strict';

var util = require('./util');

var boardParser = {
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
  }
}

module.exports = boardParser;
