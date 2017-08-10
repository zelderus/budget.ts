var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require("webpack");
var gutil = require("gulp-util");
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var runSequence = require('run-sequence');
//var removeFiles = require('gulp-remove-files');
var deletefile = require('gulp-delete-file');

var path = {
    buildPath: 'public/',
    lessFiles: [
        //'src/styles/**/*.less',
        'src/styles/main.less',
        'src/styles/actives.less',
        'src/styles/inputs.less',
        'src/styles/icons.less'
    ],
    destCssFile: 'main.css',
    scriptsForWatch: [
        'src/scripts/**/*.ts',
        'src/scripts/**/*.tsx',
        'src/scripts/**/*.js',
        'src/scripts/**/*.json',
    ],
	sourceAppFile: ['src/_prebuild/bundle.js'], // собранный файл из webpack
    copyAppFile: ['src/_prebuild/bundle.js', 'src/_prebuild/bundle.js.map'], 
	externalJsFiles: [ // внешние модули, которые необходимо переложить в публичную папку
		'node_modules/react/dist/react.min.js',
		'node_modules/react-dom/dist/react-dom.min.js'
	],
    filesToDel: [ 'public/bundle.js', 'public/bundle.js.map']
}

//
// Запускаем Webpack (в нем компиляция TypeScript и реализация модульности - CommonJs)
//  какие модули и файлы войдут в бандл, а какие исключение (например, React) - смотреть в файле конфигурации ./webpack.config.js
//  больше в Webpack мы ничего не будем делать, все остальное тут, в Gulp
//  альтернатива Browserify, но он кладет все модули в один бандл
//
gulp.task("webpack", function(callback) {
    webpack(
        require('./webpack.config.js')
        , function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({}));
            callback();
        }
    );
});

//
// Стили
//
gulp.task('styles', function(){
  return gulp.src(path.lessFiles)
    .pipe(less())
    .pipe(concatCss(path.destCssFile))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.buildPath))
});

//
// Скрипты
//
gulp.task('min:js', function(done){
    return gulp.src(path.sourceAppFile)
            .pipe(uglify())
            .pipe(gulp.dest(path.buildPath));
});
gulp.task('copy:js', function(done){
    return gulp.src(path.copyAppFile)
            .pipe(gulp.dest(path.buildPath));
});
gulp.task('del:js', function(done){
    return gulp.src(path.filesToDel)
        .pipe(deletefile({ deleteMatch: true } ));
});
gulp.task('scripts:dev', function(done){
    runSequence('webpack', function() {
		runSequence('copy:js', function() {
            done();
        });
    });
});
gulp.task('scripts:release', function(done){
    runSequence('del:js', function() {
        runSequence('webpack', function() {
            runSequence('min:js', function() {
                done();
            });
        });
    });
});

//
// Внешние модули
//
gulp.task('external:js', function(done){
    return gulp.src(path.externalJsFiles)
            .pipe(gulp.dest(path.buildPath));
});

//
// Сборки
//
gulp.task('build:dev', ['scripts:dev', 'styles'], function(){

});
gulp.task('build:release', ['scripts:release', 'styles', 'external:js'], function(){

});



//
// Watchers
//
gulp.task('watch', function(){
    gulp.watch(path.lessFiles, ['styles']);
    gulp.watch(path.scriptsForWatch, ['scripts:dev']);
});



// default
gulp.task('default', ['build:dev'], function(){

});