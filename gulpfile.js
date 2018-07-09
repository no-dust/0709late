var gulp = require('gulp');

var server = require('gulp-webserver');

var url = require('url');

var path = require('path');

var fs = require('fs');

var htmlmin = require('gulp-htmlmin');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var babel = require('gulp-babel');

var list = require('./data/list.json');

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: list }))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})

var options = {
    collapseWhitespace: true, //压缩html
}

gulp.task('htmlmin', function() {
    gulp.src('./src/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('build'))
})

gulp.task('htmlCss', function() {
    gulp.src('./src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
})

gulp.task('uglify', function() {
    gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})

gulp.task('build', ['htmlmin', 'minCss', 'unlify'])