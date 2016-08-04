'use strict';

var express = require('express');

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object} params         The extension parameters.
   * @param {Object} params.modules The module instance.
   */
  run: function(params) {
    var app = express();
    var modules = params.modules;

    app.get('/modules/' + modules.id, function (req, res) {
      var action = req.query.action;
      var moduleData = {};
      if (modules.type === 'input') {
        modules.on('data', function(data) {
          moduleData = data;
        });
        res.jsonp({ result: 'success', module: modules.module, data: moduleData });
      } else if (modules.type === 'output') {
        if (modules[action] && typeof modules[action] === 'function') {
          modules[action].apply(modules, [req.query.params]);
          res.jsonp({ result: 'success', action: action });
        } else {
          res.jsonp({ result: 'failure', message: 'No such action.' });
        }
      }
    });

    app.listen(3000, function () {
      console.log('Rest server extension listening on port 3000!');
    });
  }
}
