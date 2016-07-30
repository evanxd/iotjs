'use strict';

/**
 * LED module.
 * @constructor
 * @param {Number} pin The pin number.
 */
function LED (pin) {
  this.pin = pin;
}

LED.prototype = {
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

module.exports = LED;
