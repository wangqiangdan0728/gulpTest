var gulp = require('gulp');
//var shelljs = require('shelljs');
var browserify = require('browserify');
//var fs = require('fs');
var sequence = require('run-sequence');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpIf = require('gulp-if');
var babel = require('gulp-babel');

//构建css
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

//通过定义变量，来判断处于阶段是开发还是发布
var isProduction = process.env.NODE_ENV === 'prod';
//默认任务
gulp.task('default', function() {
    //shelljs.exec('browserify ./b.js -o ./main.js');
    //异步执行()里面的任务
    //sequence('babel', 'watch', 'mainjs');
    //每个同步执行的任务组用[]包起来，用逗号隔开
    sequence(['Sass', 'watchSass'], ['babel', 'watch', 'mainjs']);
});

gulp.task('mainjs', function() {
    var b = browserify({
        //入口文件
        entries: ['./assets/js/b.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });
    //.external('angular'); //在main.js中使用angular.js模块
    var bundle = function() {
        //pipe(管道)，进程间的通信方式
        b.bundle()
            .pipe(source('main.js')) //最终生成的文件
            .pipe(buffer())
            .pipe(gulpIf(isProduction, uglify())) //判断是否需要最小化文件
            //.pipe(fs.createWriteStream('./main.js'));
            .pipe(gulp.dest('./')); //将文件流写入文件
    };
    bundle();
    b.on('update', bundle);
});
//监听打包文件的变化
// gulp.task('watch', function() {
//     gulp.watch(['assets/js/*.js'], function() {
//         sequence('mainjs');
//     });
// });

//对引入的第三方类库打包
// gulp.task('vendorjs', function() {
//     var b = browserify().require('./bower/bower_components/angular/angular.js', {
//         //起的别名
//         expose: 'angular'
//     }).bundle().pipe(fs.createWriteStream('./vendor.js'));
// });

gulp.task('babel', function() {
    gulp.src('es6Js/*.js')
        .pipe(babel({
            presets: ['es2015'] //告诉babel,转化的类型
        }))
        .pipe(gulp.dest('./babel'));
});
gulp.task('watch', function() {
    gulp.watch(['es6Js/*.js'], function() {
        sequence('babel');
    });
});

// gulp.task('minifyCss', function() {
//     gulp.src('./assets/css/*.css')
//         .pipe(cleanCss())
//         .pipe(concat('main.css')) //合并css文件,并命名输出文件名称
//         .pipe(gulp.dest('./'));
// });
// gulp.task('watchMinifyCss', function() {
//     gulp.watch(['./assets/css/*.css'], function() {
//         sequence('minifyCss');
//     });
// });

gulp.task('Sass', function() {
    //gulp.src('./assets/css/*.scss')
    gulp.src('./assets/css/*.*')
        .pipe(sass())
        .pipe(gulpIf(isProduction, cleanCss())) //根据环境变量，判断是否需要压缩
        .pipe(concat('main.css')) //合并css文件,并命名输出文件名称
        .pipe(gulp.dest('./'));
});

gulp.task('watchSass', function() {
    gulp.watch(['./assets/css/*.*'], function() {
        sequence('Sass');
    });
});