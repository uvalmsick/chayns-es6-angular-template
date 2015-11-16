import gulp from "gulp";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import browserSync from "browser-sync";
import rimraf from "gulp-rimraf";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import fs from "fs";

let devServer = browserSync.create();

/**
 * Default task.
 */
gulp.task("default", ["server"]);

/**
 * Calls task chain for building the app.
 */
gulp.task("build", ["sourcemaps"]);

/**
 * Bundles js files.
 */
gulp.task("bundle", ["manifest"], () =>
    browserify("./src/js/core/bootstrap.js")
    .transform(babelify)
    .bundle()
    .pipe(source("./app.bundle.js"))
    .pipe(gulp.dest("./src/js"))
    .pipe(devServer.reload({ stream: true }))
);

/**
 * Uglifies bundled js file.
 */
gulp.task("uglify", ["copy"], () =>
    gulp.src('./dist/js/app.bundle.js')
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist/js'))
);

/**
 * Generates sourcemaps for uglified js file.
 */
gulp.task("sourcemaps", ["uglify"], () =>
    gulp.src('./dist/js/app.bundle.min.js')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./dist/js'))
);

/**
 * Copies files to dist folder.
 */
gulp.task("copy", ["copy:scripts"]);
gulp.task("copy:scripts", ["copy:styles"], () => gulp.src("./src/js/app.bundle.js").pipe(gulp.dest("./dist/js")));
gulp.task("copy:styles", ["copy:views"], () => gulp.src("./src/css/**/*.css").pipe(gulp.dest("./dist/css")));
gulp.task("copy:views", ["copy:index"], () => gulp.src("./src/views/**/*.html").pipe(gulp.dest("./dist/views")));
gulp.task("copy:index", ["clean"], () => gulp.src("./src/*").pipe(gulp.dest("./dist")));

/**
 * Cleans dist folder.
 */
gulp.task("clean", ["bundle"], () => gulp.src("./dist/**/*").pipe(rimraf({ force: true })));

gulp.task("manifest", () => {
    let manifest = "./src/appcache.manifest";

    return fs.readFile(manifest, 'utf8', (err, data) => {
        if (err) return console.error(err);
        fs.writeFile(manifest, data.replace(/#\sVersion:\s.*/, `# Version: ${Date.now()}`), 'utf8', (err) => {
            if (err) return console.error(err);
        });
    });

});

/**
 * Creates dev server and watches files.
 */
gulp.task("server", ["bundle"], () => {
    devServer.init({
        server: "./src"
    });

    gulp.watch("./src/**/*.html", devServer.reload);
    gulp.watch(["./src/js/**/*.js", "!./src/js/app.bundle.js"], ["bundle"]);
});