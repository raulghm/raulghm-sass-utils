/*!
 * Gulpfile Setup
 * author: Raúl Hernández <raulghm@gmail.com>
 */

'use strict';

// Include Gulp and other build automation tools and utilities.
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

// Settings
var SRC = './test/src'; // The source input folder
var DEST = './test/dist/'; // The build output folder
var src = {};

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// Styles
gulp.task('styles', function () {
	src.styles = [SRC + '/**/*.scss'];
	return gulp.src(SRC + '/styles.scss')
		.pipe($.plumber())
		.pipe($.sass({
			sourceComments: false,
			outputStyle: 'nested',
			errLogToConsole: false,
			onError: function(err) {
				return console.log(err)
			}
		}))
		.pipe(gulp.dest(DEST))
});

// Default task
gulp.task('default', ['build']);

// Build task
gulp.task('build', ['clean'], function (cb) {
	runSequence(['styles', 'watch'], cb);
});

// Watch task
gulp.task('watch', function () {
	gulp.watch(src.styles, ['styles']);
});