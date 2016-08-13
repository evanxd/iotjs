'use strict';

var IO = require('thingjs-io');

/**
 * Servo module.
 * @constructor
 * @param {Array} pins The pin numbers.
 */
function Servo (pins) {
  var options = {
    // Default 20ms period(500Hz) is for Linkit 7688.
    period: 20000000,
    maxDutyCycle: 2200000,
    minDutyCycle: 500000,
  };
  this._servo = new IO(pins, 'pwm', options);
}

Servo.MAX_DEGREE = 180;

Servo.prototype = {
  id:       null,
  module:   'Servo',
  type:     'output',
  _degree:  0,

  /**
   * Rotate the servo.
   * @param  {Number} degree The degree is between 0 and 180.
   * @return {Number} Current rotation degree.
   */
  rotate: function(degree) {
    if (degree >= 0 && degree <= Servo.MAX_DEGREE) {
      this._servo.val(degree / Servo.MAX_DEGREE);
      this._degree = degree;
    } else if (degree !== undefined) {
      console.warn('The degree: ' + degree + ' is invalid.');
    }
    return this._degree;
  }
};

module.exports = Servo;
