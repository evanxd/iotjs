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

    app.get('/modules/' + params.modules.id, function (req, res) {
      var action = req.query.action;
      var apiCall = params.modules[action];
      if (apiCall && typeof apiCall === 'function') {
        apiCall.apply(params.modules, [req.query.params]);
        res.jsonp({ result: 'success', action: action });
      } else {
        res.jsonp({ result: 'failure', message: 'No such action.' });
      }
    });

    app.listen(3000, function () {
      console.log('Rest server extension listening on port 3000!');
    });
  }
}
