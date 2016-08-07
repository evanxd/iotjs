'use strict';

var IO = require('thingjs-io');

/**
 * Switch module.
 * @constructor
 * @param {Number} pins The pins number.
 */
function Switch (pins) {
  this.pin = new IO(pins, 'in');
}

Switch.prototype = {
  id: null,
  module: 'Switch',
  type: 'input',

  /**
   * Listen the switch's state.
   * @param {String} eventName The name of the event.
   * @param {Function} listener The callback function.
   */
  on: function (eventName, listener) {
    this.pin.on('data', function(data) {
      switch (eventName) {
        case 'data':
          listener(data);
          break;
        case 'on':
          !data && listener(data);
          break;
        case 'off':
          data && listener(data);
          break;
        default:
          console.warn('No such event supported.');
      }
    });
  }
};

module.exports = Switch;
