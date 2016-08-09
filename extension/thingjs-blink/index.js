'use stric';

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object}    params          The extension parameters.
   * @param {Led|Array} params.modules  The LED instances.
   * @param {Number}    params.interval The blinking rate.
   */
  run: function(params) {
    params.modules.forEach(function(_module) {
      _module.blink(params.interval);
    });
  }
}
