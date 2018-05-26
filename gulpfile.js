var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('clean', function () {
  return del('dist')
});

gulp.task('default', ['clean', 'build']);

gulp.task('build', function () {
  var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));
  var tsResult = gulp.src('./server/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
  return tsResult.js
    .pipe(sourcemaps.write('.', {
      sourceRoot: function(file){ return file.cwd + '/server'; }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('test', function () {
  var tsProject = ts.createProject(path.resolve('./test/tsconfig.json'));
  var tsResult = gulp.src('./test/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
  return tsResult.js
    .pipe(concat('specs.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(testPath))
});

gulp.task('serve', function () {
  gulp.watch('./**/*.ts', ['build']);
  livereload.listen();
  nodemon({
    env: { 'NODE_ENV': 'development' },
    script: './dist/main.js',
    ext: 'js',
  }).on('restart', function () {
      setTimeout(function () {
          livereload.reload();
      }, 500);
  });
});