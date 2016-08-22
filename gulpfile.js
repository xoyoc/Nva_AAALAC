var gulp = require('gulp')
var postcss = require('gulp-postcss')
var rucksack = require('rucksack-css')
var cssnext = require('postcss-cssnext')
var cssnested = require('postcss-nested')
var mixins = require('postcss-mixins')
var lost = require('lost')
var atImport = require('postcss-import')
var csswring = require('csswring')
var mqpacker = require('css-mqpacker')
var browserSync = require('browser-sync').create()

// Copiando los contenidos a la carpeta publica
gulp.task('assest', function(){
    gulp
      .src('assest/*')
      .pipe(gulp.dest('public'));
    gulp
      .src('*.html')
      .pipe(gulp.dest('public'));
    gulp
      .src('*.css')
      .pipe(gulp.dest('public'));
  })

// Servidor de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
})

// Tarea para procesar el CSS
gulp.task('css', function () {
  var processors = [
    atImport(),
    mixins(),
    cssnested,
    lost(),
    rucksack(),
    cssnext(),
    mqpacker()
    //csswring()
  ]

  return gulp.src('index.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

// Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('./*.css', ['css'])
  gulp.watch('./public/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['assest','watch', 'serve'])