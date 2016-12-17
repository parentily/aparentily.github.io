"use strict";

/**
 * Requirements
 */
var gulp = require("gulp");
var argv = require ("yargs").argv;
var print = require ("gulp-print");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var replace = require('gulp-replace');

/**
 * Get current timestamp
 */
var getTimeStamp = function () {
  return " [" + new Date ().toString ().split (" ") [4] + "]";
};

/**
 * Tasks
 * =====
 */

/**
 * Task - Bricks
 */
gulp.task("build-site", function () {
  var scssFiles = "styles/**/*.scss";
  var cssFolder = "css";

  var autoprefixerConfig = {
    browsers: ["> 1%", "last 2 versions", "Firefox ESR"]
  };

  var sassConfig = {
    // nested, expanded, compact, compressed
    outputStyle: "expanded"
  };

  var compileSass = function () {
    gulp.src(scssFiles)
      .pipe (sass (sassConfig).on ('error', sass.logError))
      .pipe (gulp.dest (cssFolder))
      .pipe (autoprefixer (autoprefixerConfig))
      .pipe (gulp.dest (cssFolder))
      .pipe (print (function (filepath) {
        return "Compiled: " + filepath + getTimeStamp ();
      }));
  };

  if (argv.watch) {
    compileSass ();
    gulp.watch ("./**/*.scss", compileSass);
  } else {
    compileSass ();
  }
});
