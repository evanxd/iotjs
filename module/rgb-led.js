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
      var values = this._color2values(color);
      this._red.val(values[0]);
      this._green.val(values[1]);
      this._blue.val(values[2]);
    }
    this._enable();
  },

  /**
   * Turn off the RGB LED.
   */
  off: function () {
    this._timerId && this.stopBlink();
    this._disable();
  },

  /**
   * Blink the RGB LED.
   * @param {String} [color] Color code or name.
   * @param {Number} [interval] The interval of blinking the RGB LED.
   */
  blink: function (color, interval) {
    if (color) {
      this.on(color);
      this.color = color;
    }
    interval = interval || RgbLed.DEFAULT_INTERVAL;
    var isEnable = true;
    this._timerId = setInterval(function() {
      isEnable ? this._enable() : this._disable();
      isEnable = !isEnable;
    }.bind(this), interval);
  },

  /**
   * Stop blinking the RGB LED.
   */
  stopBlink: function() {
    clearInterval(this._timerId);
    this._timerId = 0;
  },

  /**
   * Enable the RGB LED.
   * @ignore
   */
  _enable: function() {
    this._red.enable();
    this._green.enable();
    this._blue.enable();
  },

  /**
   * Disable the RGB LED.
   * @ignore
   */
  _disable: function() {
    this._red.disable();
    this._green.disable();
    this._blue.disable();
  },

  /**
   * Get PWM values of the red, green, and blue LEDs.
   * @param {String} color Color code or name, e.g. #28ABE3.
   * @return {Array} Duty cycle values.
   * @ignore
   */
  _color2values: function(color) {
    var values = [0, 0, 0];
    if (color.charAt(0) === '#' && color.length === 7) {
      for (var i = 0; i < 3; i++) {
        values[i] = parseInt(color.substr(1 + 2 * i, 2), 16) / 255;
      }
    } else {
      console.warn('The color is invalid.');
    }
    return values;
  }
};

module.exports = RgbLed;
