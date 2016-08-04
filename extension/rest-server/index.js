'use strict';

var express = require('express');

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object}       params         The extension parameters.
   * @param {Object|Array} params.modules The module instances.
   */
  run: function(params) {
    var app = express();
    var modules = params.modules;
    modules = Array.isArray(modules) ? modules : [modules];

    modules.forEach(function(_module) {
      app.get('/modules/' + _module.id, function (req, res) {
        var action = req.query.action;
        var moduleData = {};
        if (_module.type === 'input') {
          _module.on('data', function(data) {
            moduleData = data;
          });
          res.jsonp({ result: 'success', module: _module.module, data: moduleData });
        } else if (_module.type === 'output') {
          if (_module[action] && typeof _module[action] === 'function') {
            _module[action].apply(_module, [req.query.params]);
            res.jsonp({ result: 'success', action: action });
          } else {
            res.jsonp({ result: 'failure', message: 'No such action.' });
          }
        }
      });
    });

    app.listen(3000, function () {
      console.log('Rest server extension listening on port 3000!');
    });
  }
}
