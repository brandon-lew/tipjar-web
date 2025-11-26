// GULP
const gulp = require('gulp');

// MODULES
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

// SOURCE DIRECTORY
const sourceDir = 'src/styles/';

// DESTINATION DIRECTORY
const destDir = 'src/styles/';

//----------
// TASKS
//----------

// COMPILE SASS
gulp.task('compile', () => {
  return gulp
    .src([`${sourceDir}*.{sass,scss}`])
    .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(destDir));
});

gulp.task('sass:watch', () => {
  gulp.watch(`${sourceDir}*.{sass,scss}`, gulp.series(['compile']), () => {});
});

gulp.task(
  'default',
  gulp.series(['sass:watch'], () => {})
);
