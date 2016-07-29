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
   * Event listener.
   * @param {String} event Event name.
   * @param {Function} callback Trigger function.
   */
  on: function (event, callback) {}
};
