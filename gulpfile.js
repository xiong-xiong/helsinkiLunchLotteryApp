
var gulp   = require('gulp'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		minifyCSS = require('gulp-clean-css'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		uglify = require('gulp-uglify');
		changed = require('gulp-changed');

var scss_src = './src/scss/*.scss';
    scss_dest = './www/css';

gulp.task('styles', function() {
	 gulp.src(scss_src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(concat('style.css'))
		.pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(sourcemaps.write('.'))
		.pipe(changed(scss_dest))
		.pipe(gulp.dest(scss_dest))
});




// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch(scss_src, ['styles']);
});

gulp.task('default', ['styles','watch']);
