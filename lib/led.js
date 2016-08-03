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
  module: 'Led',
  _timerId: null,

  /**
   * Light on the LED.
   */
  on: function () {
    this._timerId && this.stopBlink();
    this.pin.val(0);
  },

  /**
   * Light off the LED.
   */
  off: function () {
    this._timerId && this.stopBlink();
    this.pin.val(1);
  },

  /**
   * Blink the LED.
   * @param {Number} interval The interval of blinking the LED.
   */
  blink: function (interval) {
    var pin = this.pin;
    interval = interval || 500;
    this._timerId && this.stopBlink();
    this._timerId = setInterval(function() {
      pin.val(1 - pin.val());
    }, interval);
  },

  /**
   * Stop blinking the LED.
   */
  stopBlink: function() {
    clearInterval(this._timerId);
    this._timerId = null;
  }
};

module.exports = Led;
