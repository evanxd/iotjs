'use strict';

var IO = require('thingjs-io');

/**
 * LED module.
 * @constructor
 * @param {Number} pin The pin number.
 */
function Led (pin) {
  this.pin = new IO(pin, 'out');
}

Led.prototype = {
  _timerId: null,

  /**
   * Light on the LED.
   */
  on: function () {
    this.pin.val(0);
  },

  /**
   * Light off the LED.
   */
  off: function () {
    this.pin.val(1);
  },

  /**
   * Blink the LED.
   * @param {Number} interval The interval of blinking the LED.
   */
  blink: function (interval) {
    var pin = this.pin;
    this._timerId = setInterval(function() {
      pin.val(1 - pin.val());
    }, interval);
  }

  /**
   * Stop blinking the LED.
   */
  stopBlink: function() {
    clearInterval(this._timerId);
  }
};

module.exports = Led;
