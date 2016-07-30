'use strict';

var exec = require('child_process').execSync;
var gulp = require('gulp');

gulp.task('doc', function() {
  exec('jsdoc -c jsdoc.json');
});
