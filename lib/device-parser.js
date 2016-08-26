'use strict';

var util = require('./util');

var boardParser = {
  _modules: null,

  parse: function(board) {
    this._initModules(board);
    this._executeExtensions(board);
    return this._modules;
  },

  _initModules: function(board) {
    this._modules = {};
    for (var key in board.modules) {
      var Module = require('../module/' + util.module2fileName(board.modules[key].module));
      this._modules[key] = new Module(board.modules[key].pins);
      this._modules[key].id = key;
    }
  },

  _executeExtensions: function(board) {
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
      var params = { modules: null };
      var extensionParams = board.extensions[key];
      for (key in extensionParams) {
        if (key === 'modules') {
          var modules = extensionParams.modules;
          if (typeof modules === 'object') {
            params.modules = {};
            for (key in modules) {
              params.modules[key] = this._modules[modules[key]];
            }
          } else if (typeof modules === 'string') {
            params.modules = this._modules[modules];
          } else if (Array.isArray(modules)) {
            params.modules = [];
            modules.forEach(function(name) {
              params.modules.push(this._modules[name]);
            }.bind(this));
          } else {
            console.warn('The extension `modules` param is invalid.');
          }
        } else {
          params[key] = extensionParams[key];
        }
      }
      extension.run(params);
    }
  }
};

module.exports = boardParser;
