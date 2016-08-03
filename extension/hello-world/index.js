'use strict';

var express = require('express');

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object} params         The extension parameters.
   * @param {Led}    params.modules The LED instance.
   */
  run: function(params) {
    var app = express();

    app.get('/' + params.modules.module, function (req, res) {
      var action = req.query.action || 'blink';
      var apiCall = params.modules[action];
      if (apiCall && typeof apiCall === 'function') {
        // FIXME: Don't know why cannot use apiCall() here.
        params.modules[action]();
        res.jsonp({ result: 'success', action: action });
      } else {
        res.jsonp({ result: 'failure', message: 'No such action.' });
      }
    });

    app.listen(3000, function () {
      console.log('Hello world extension listening on port 3000!');
    });
  }
}
