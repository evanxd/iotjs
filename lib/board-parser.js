'use strict';

var util = require('./util');

function BoardParser() {}

BoardParser.prototype = {
  _modules: null,

  parse: function(board) {
    this._initModules(board);
    this._executeExtensions(board);
    return this._modules;
  },

  _initModules: function(board) {
    var this._modules = {};
    for (var key in board.modules) {
      var Module = require('../module/' + util.module2fileName(board.modules[key].module));
      this._modules[key] = new Module(board.modules[key].pins);
      this._modules[key].id = key;
    }
  },

  _executeExtensions: function(board) {
    var modules = this._modules;
    for (var key in board.extensions) {
      // Load extensions. If 3rd-party modules exist, load them first,
      // or load built-in modules.
      var extension;
      try {
        if (util.is3rdPartyModuleExisted(key)) {
          extension = require(key);
        } else {
          extension = require('../extension/' + key);
        }
      } catch(e) {
        console.error(e.message);
      }
      // Trigger the extension start point method with the params.
      var params = { modules: [] };
      var extensionParams = board.extensions[key];
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
  }
};

module.exports = new BoardParser();
