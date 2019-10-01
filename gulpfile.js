//Подлючаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

//Порядок подключения css файлов
const cssFiles = [
  './src/css/normalize.css'
  './src/css/main.css',
  './src/css/media.css'
]

//Порядок подключения js файлов
const jsFiles = [
  './src/js/main.js',
  './src/js/lib.js'
]

// Таск на стили CSS
function styles() {
  //Шаблон для поиска файлов class
  //Все файлы по шаблону './*/src/css/*.css'
  return gulp.src(cssFiles)
  //Объединение файлов в один
  .pipe(concat('style.css'))
  //Добавление префиксов
  .pipe(autoprefixer({
            cascade: false
        }))
  //Минификация кода CSS
  .pipe(cleanCSS({
    level: 2
  }))
  //Выходная папка для стилей
  .pipe(gulp.dest('./assets/css'))
  .pipe(browserSync.stream());
}

//Таск на скрипты JS
function scripts() {
  //Шаблон для поиска файлов JS
  //Все файлы по шаблону './*/src/js/*.js'
  return gulp.src(jsFiles)
  //Объединение файлов в один
  .pipe(concat('script.js'))

  //Минификация кода JS
  .pipe(uglify())

  //Выходная папка для JS
  .pipe(gulp.dest('./assets/js'))
  .pipe(browserSync.stream());
}

//Удалить всё в указанной папке
function clean() {
  return del(['./assets'])
}

//Отслеживание файлов
function watch() {
  browserSync.init({
    server: "./"
  });
  //Следить за CSS файлами
  gulp.watch('./src/css/*.css', styles)
  //Следить за JS файлами

  //Следить за обновлением HTML при изменении HTML запцустить синхронизацию
  gulp.watch('./*.html').on('change', browserSync.reload);
}

//Таск вызывающий функцию styles
gulp.task('styles', styles);
//Таск вызывающий функцию scripts
gulp.task('scripts', scripts);
//Таск для очистки папки
gulp.task('del', clean);
//Таск для отслеживания изменений
gulp.task('watch', watch);
//Таск для удаления файлов в папке и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)))
