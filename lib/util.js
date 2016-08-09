'use strict';

var fs = require('fs');

var util = {
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
