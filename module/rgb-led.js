'use strict';

var IO = require('thingjs-io');

/**
 * RGB LED module.
 * @constructor
 * @param {Array} pins The pin numbers.
 */
function RgbLed (pins) {
  this._red =   new IO(pins[0], 'pwm');
  this._green = new IO(pins[1], 'pwm');
  this._blue =  new IO(pins[2], 'pwm');
}

RgbLed.DEFAULT_INTERVAL = 500;
RgbLed.DEFAULT_PERIOD = 19200000;

RgbLed.prototype = {
  id:       null,
  module:   'RgbLed',
  type:     'output',
  color:    null,
  _red:     null,
  _green:   null,
  _blue:    null,
  _timerId: 0,

  /**
   * Turn on the RGB LED.
   * @param {String} [color] Color code or name, e.g. #28ABE3.
   */
  on: function (color) {
    this._timerId && this.stopBlink();
    if (color) {
      this.color = color;
      var dutyCycles = this._color2dutyCycles(color);
      this._red.val(dutyCycles[0], RgbLed.DEFAULT_PERIOD);
      this._green.val(dutyCycles[1], RgbLed.DEFAULT_PERIOD);
      this._blue.val(dutyCycles[2], RgbLed.DEFAULT_PERIOD);
    }
    this._red.enable();
    this._green.enable();
    this._blue.enable();
  },

  /**
   * Turn off the RGB LED.
   */
  off: function () {
    this._timerId && this.stopBlink();
    this._red.disable();
    this._green.disable();
    this._blue.disable();
  },

  /**
   * Blink the RGB LED.
   * @param {Number} [interval] The interval of blinking the RGB LED.
   * @param {String} [color] Color code or name.
   */
  blink: function (interval, color) {
    interval = interval || RgbLed.DEFAULT_INTERVAL;
    if (color) {
      this.on(color);
      this.color = color;
    }
    var isEnable = true;
    this._timerId = setInterval(function() {
      isEnable ? this.on() : this.off();
      isEnable = !isEnable;
    }, interval);
  },

  /**
   * Stop blinking the RGB LED.
   */
  stopBlink: function() {
    clearInterval(this._timerId);
    this._timerId = 0;
  },

  /**
   * Get duty cycle values of the red, green, and blue LEDs.
   * @param {String} color Color code or name, e.g. #28ABE3.
   * @return {Array} Duty cycle values.
   * @ignore
   */
  _color2dutyCycles: function(color) {
    var dutyCycles = [0, 0, 0];
    if (color.charAt(0) === '#' && color.length === 7) {
      for (var i = 0; i < 3; i++) {
        dutyCycles[i] = RgbLed.DEFAULT_PERIOD *
          parseInt(color.substr(1 + 2 * i, 2), 16) / 255;
      }
    } else {
      console.warn('The color is invalid.');
    }
    return dutyCycles;
  }
};

module.exports = RgbLed;
