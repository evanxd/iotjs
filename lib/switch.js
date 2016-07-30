'use strict';

/**
 * Switch module.
 * @constructor
 * @param {Number} pin The pin number.
 */
function Switch (pin) {
  this.pin = pin;
}

Switch.prototype = {
  /**
   * Listen the switch's state.
   * @param {String} event The name of the event.
   * @param {Function} listener The callback function.
   */
  on: function (eventName, listener) {}
};

module.exports = Switch;
