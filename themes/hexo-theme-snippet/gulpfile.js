(function() {
    'use strict';
    var gulp = require('gulp'),
        less = require('gulp-less'),
        rename = require('gulp-rename'),
        minifycss = require('gulp-minify-css'),
        autoprefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
        notify = require('gulp-notify'),
        plumber = require('gulp-plumber'),
        htmlclean = require('gulp-htmlclean'),
        htmlmin = require('gulp-htmlmin'),
        rev = require('gulp-rev-append'),
        sequence = require('gulp-sequence'),
        path = require('path'),
        paths = {
            root: './',
            source: './themes/hexo-theme-snippet/source/' //主题下原文件
        }

    /*====================================================
         开发主题
    ====================================================*/

    // CSS预处理
    function less_task() {
        return gulp.src(paths.source + 'css/less/_style.less')
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            }))
            .pipe(less())
            .pipe(rename({ basename: "style" }))
            .pipe(gulp.dest(paths.source + 'css'))
            .pipe(notify({ message: 'less compile complete' }));
    }

    // 校验JS语法和风格
    function js_task() {
        return gulp.src(paths.source + 'js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(gulp.dest(paths.source + 'js/'))
            .pipe(notify({ message: 'js compile complete' }));
    }

    // 监听任务-主题开发模式
    gulp.task('dev', function() {
        gulp.watch(paths.source + 'css/less/*.less', ['less_task']);
        gulp.watch(paths.source + 'js/*.js', ['js_task']);
    });


    /*====================================================
        部署前代码处理
    ====================================================*/

    // 压缩处理 css
    function minify_css() {
        return gulp.src('./public/**/*.css')
            .pipe(autoprefixer({
                browsers: ['last 10 versions', 'Firefox >= 20', 'Opera >= 36', 'ie >= 9', 'Android >= 4.0', ],
                cascade: true, //是否美化格式
                remove: false //是否删除不必要的前缀
            }))
            .pipe(minifycss())
            .pipe(gulp.dest('./public'))
            .pipe(notify({ message: 'css minify complete' }));
    }

    // 压缩处理 js
    function minify_js() {
        return gulp.src('./public/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./public/js'))
            .pipe(notify({ message: 'js minify complete' }));
    }

    // 压缩处理 html
    function minify_html() {
        return gulp.src('./public/**/*.html')
            .pipe(htmlclean())
            .pipe(htmlmin({
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                minifyJS: true, //压缩页面JS
                minifyCSS: true, //压缩页面CSS
                minifyURLs: true
            }))
            .pipe(gulp.dest('./public'));
    }

    // 部署前代码处理
    exports.default = gulp.series(minify_css, minify_js, minify_html);
})();