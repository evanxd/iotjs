'use strict';

var express = require('express');

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object} params         The extension parameters.
   * @param {Array}  params.modules The module instances.
   */
  run: function(params) {
    var app = express();

    modules.forEach(function(_module) {
      app.get('/modules/' + _module.id, function (req, res) {
        if (_module.type === 'input') {
          var moduleData = {};
          _module.on('data', function(data) {
            moduleData = data;
          });
          res.jsonp({ result: 'success', module: _module.module, data: moduleData });
        } else if (_module.type === 'output') {
          var action = req.query.action;
          if (_module[action] && typeof _module[action] === 'function') {
            _module[action].apply(_module, [req.query.params]);
            res.jsonp({ result: 'success', action: action });
          } else {
            res.jsonp({ result: 'failure', message: 'No such action.' });
          }
        } else {
          console.warn('No such module type.');
        }
      });
    });

    app.listen(3000, function () {
      console.log('Rest server extension listening on port 3000!');
    });
  }
}
