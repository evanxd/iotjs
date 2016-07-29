'use strict';

/**
 * LED module.
 * @constructor
 * @param {Number} pin The pin number.
 * @param {Object} options The options.
 */
function LED (pin, options) {
  this.pin = pin;
  this.options = options || { type: 'rgb' };
}

LED.prototype = {
  /**
   * Light on the LED.
   * @param {String} color Color of LED.
   */
  on: function (color) {},

  /**
   * Light off the LED.
   */
  off: function () {},

  /**
   * Blink the LED.
   * @param {Number} interval The interval of blinking the LED.
   */
  blink: function (interval) {}
};
