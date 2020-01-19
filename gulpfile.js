const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
var bs = require("browser-sync").create();

const srcPath = "./assets/src";
const distPath = "./assets/dist";

sass.compiler = require("node-sass");

// Live server
gulp.task("browser-sync", function() {
  const files = [
    "*.html",
    "./assets/src/js/*.js",
    "./assets/src/scss/**/**/*.scss"
  ];

  bs.init(files, {
    server: {
      baseDir: "./"
    }
  });
});

// Styles
gulp.task("sass", function() {
  return gulp
    .src(`${srcPath}/scss/**/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.css"))
    .pipe(gulp.dest(`${distPath}/css`))
    .pipe(bs.reload({ stream: true }));
});

// Scripts
gulp.task("js", function() {
  gulp
    .src(`${srcPath}/js/scripts.js`)
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(gulp.dest(`${distPath}/js/`))
    .pipe(bs.reload({ stream: true }));
});

// Image minification
gulp.task("smash", function() {
  gulp
    .src(`${srcPath}/images/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${distPath}/images`))
    .pipe(bs.reload({ stream: true }));
});

gulp.task("watch", function() {
  gulp
    .watch(`${srcPath}/**/**/**.*`, ["sass", "js", "smash"])
    .on("change", function() {
      bs.reload();
    });
});
