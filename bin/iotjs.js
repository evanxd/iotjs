#!/usr/bin/env node

var parser = require('../lib/device-parser');
// Parse the `device.json` file by default.
var device = require(process.cwd() + '/device.json');
parser.parse(device);
