'use stric';

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object} params          The extension parameters.
   * @param {Led}    params.modules  The LED instance.
   * @param {Number} params.interval The blinking rate.
   */
  run: function(params) {
    params.modules.blink(params.interval);
  }
}
