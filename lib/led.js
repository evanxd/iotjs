'use strict';

/**
 * LED module.
 * @constructor
 * @param {Number} pin The pin number.
 */
function Led (pin) {
  this.pin = pin;
}

Led.prototype = {
  /**
   * Light on the LED.
   */
  on: function () {},

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

module.exports = Led;
