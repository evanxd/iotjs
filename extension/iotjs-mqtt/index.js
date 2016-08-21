'use strict';

var mqtt = require('mqtt');
var shortid = require('shortid');

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object} params         The extension parameters.
   * @param {Array}  params.modules The module instances.
   * @param {String} params.server  The server domain name.
   * @param {String} params.boardId The board ID.
   */
  run: function(params) {
    var mqttServer = params.server || 'mqtt://test.mosquitto.org';
    var client = mqtt.connect(mqttServer);
    var boardId = params.boardId || shortid.generate();

    client.on('connect', function () {
      console.log('Connected wit the MQTT server: ' + mqttServer);
      var modules = params.modules;
      modules = Array.isArray(modules) ? modules : [modules];
      modules.forEach(function(_module) {
        var topic = boardId + '/' + _module.id;
        if (_module.type === 'input') {
          _module.on('data', function(data) {
            client.publish(topic, JSON.stringify(data));
          });
        } else {
          console.warn('No such module type.');
        }
        console.log('The ' + _module.id + ' module will publish message on ' +
                    topic + ' topic.');
      });
    });
  }
}
