'use strict';

/**
 * Dust sensor module.
 * @constructor
 * @param {Array} pins The pin numbers.
 */
function DustSensor (pins) {
  this.pins = pins;
}

DustSensor.prototype = {
  /**
   * Listen the dust sensor's state.
   * @param {String} eventName The name of the event.
   * @param {Function} listener The callback function.
   */
  on: function (eventName, listener) {}
};

module.exports = DustSensor;
