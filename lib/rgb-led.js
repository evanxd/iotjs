'use strict';

/**
 * RGB LED module.
 * @constructor
 * @param {Array} pins The pin numbers.
 */
function RGBLED (pins) {
  this.pins = pins;
}

RGBLED.prototype = {
  /**
   * Light on the RGB LED.
   * @param {String} color Color code or name.
   */
  on: function (color) {},

  /**
   * Light off the RGB LED.
   */
  off: function () {},

  /**
   * Blink the RGB LED.
   * @param {String} color Color code or name.
   * @param {Number} interval The interval of blinking the RGB LED.
   */
  blink: function (color, interval) {}
};

module.exports = RGBLED;
