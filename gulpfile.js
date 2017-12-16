var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };


// Logs message

gulp.task('message', function() {
	return console.log('Gulp is running....');
});

// Browser Sync
gulp.task('browser-sync',  ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', reload);
});

// Copy and minify all html files

gulp.task('copyhtml', function() {
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'));
});

// Optimize images

gulp.task('imagemin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))   
);

// Compress JavaScript

gulp.task('minify', function() {
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
});

// Compile Sass
gulp.task('sass', function() {
	gulp.src('src/sass/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(reload({stream: true}));
});

// Concat Javascript
gulp.task('scripts', function() {
	gulp.src('src/js/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

// Run ALL tasks

gulp.task('default', ['message', 'copyhtml', 'htmlminify', 'imagemin', 'sass', 'scripts', 'browser-sync']);

// Watch Gulp tasks

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/images/*', ['imagein']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', ['copyhtml']);
});
