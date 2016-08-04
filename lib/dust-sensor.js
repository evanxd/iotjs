'use strict';

var IO = require('thingjs-io');

/**
 * Dust sensor module.
 * @constructor
 * @param {Number} pins The pin number.
 */
function DustSensor (pins) {
  this.pins = new IO(pins, 'uart');
}

DustSensor.prototype = {
  id: null,
  module: 'DustSensor',
  type: 'input',

  /**
   * Listen the dust sensor's state.
   * @param {String} eventName The name of the event.
   * @param {Function} listener The callback function.
   */
  on: function (eventName, listener) {
    if (eventName === 'data') {
      this.pins.on('data', function(data) {
        listener(this._rawData2PmData(data));
      }.bind(this));
    }
  },

  _rawData2PmData: function (data) {
    var pm10 = -1, pm25 = -1, pm100 = -1;
    if (data.length === 30 || data.length === 22) {
      pm10  = data.charCodeAt(8) *  0x100 + data.charCodeAt(9);
      pm25  = data.charCodeAt(10) * 0x100 + data.charCodeAt(11);
      pm100 = data.charCodeAt(12) * 0x100 + data.charCodeAt(13);
    }
    return { pm10: pm10, pm25: pm25, pm100: pm100 };
  }
};

module.exports = DustSensor;
