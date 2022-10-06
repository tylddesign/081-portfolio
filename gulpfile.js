const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Компилирование scss кода
gulp.task('styles', function () {
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream()); // обновление страницы, заново запускает browserSync
})

//Отслеживание изменений стилей в папке "src/scss/**/*"" и кода html "src/*.html""
gulp.task('watch', function () {
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", gulp.parallel("html"));
    gulp.watch("src/js/**/*.js").on("all", gulp.parallel("scripts"));
    gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
    gulp.watch("src/icons/**/*").on("all", gulp.parallel("icons"));
    gulp.watch("src/img/**/*").on("all", gulp.parallel("img"));
});

//Изменение файлов html в папке src сжимаем и переносим в папку dist
gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
});

//Переносим файлы js из папки src в dist
gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

//Переносим шрифты из папки src в dist
gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*.woff2")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

//Переносим иконки из папки icons в dist
gulp.task('icons', function () {
    return gulp.src("src/icons/**/*.+(svg|png)")
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});

//Переносим и сжимаем изображения из папки img в dist
gulp.task('img', function () {
    return gulp.src("src/img/**/*.+(svg|png|jpg)")
        // .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

//Переносим mailer из папки img в dist
gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*.*")
        .pipe(gulp.dest("dist/mailer"))
});




gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'img', 'mailer'));

