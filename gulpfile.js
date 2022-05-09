const { src, dest, watch, series } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cssmain = require("gulp-cssmin");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const replace = require("gulp-replace");
const destinationFolder = releaseFolder();

function releaseFolder() {
  var arr = __dirname.split("/");
  var folder = arr.pop();
  arr.push(folder + "_release");
  return arr.join("/");
}

console.log(">> Building to ", destinationFolder);
// control
const minifyContent = () => {
  return src("control/content/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("./"))
    .pipe(dest(destinationFolder + "/control/content"));
};

const minifyIntroduction = () => {
  return src("control/introduction/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("./"))
    .pipe(dest(destinationFolder + "/control/introduction"));
};

const minifyLanguage = () => {
  return src([
    "control/language/JS/stringsUI.js",
    "control/language/JS/language.controller.js",
  ])
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(terser({ toplevel: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(destinationFolder + "/control/language"));
};

// widget
const minifyWidget = () => {
  return src("widget/app.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(
      terser({
        toplevel: true,
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(dest(destinationFolder + "/widget"));
};

// widget common
const minifyWidgetCommon = () => {
  return src([
    "widget/common/controllers/*.js",
    "widget/common/helper/*.js",
    "widget/common/js/*.js",
    "widget/common/model/*.js",
    "widget/common/repository/*.js",
    "widget/common/shared/*.js",
  ])
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(
      terser({
        toplevel: true,
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(dest(destinationFolder + "/widget/common"));
};

// style
const minifyStyleControl = () => {
  return src([
    "control/content/*.css",
    "control/introduction/*.css",
    "control/language/*.css",
  ])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(cssmain())
    .pipe(concat("styleControl.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(destinationFolder + "/style"));
};

const minifyStyleWidget = () => {
  return src("widget/*.css")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(cssmain())
    .pipe(concat("styleWidget.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(destinationFolder + "/style"));
};

// html
const minifyHTMLControl = () => {
  return (
    src(
      [
        "control/content/*.html",
        "control/introduction/*.html",
        "control/language/*.html",
      ],
      { base: "." }
    )
      .pipe(
        replace(
          'src="../../../trainingPlugin_release/control/content/main.js"' ||
            'src="../../../trainingPlugin_release/control/introduction/main.js"' ||
            'src="../../../trainingPlugin_release/control/language/main.js"',
          'src="./main.js"'
        )
      )
      .pipe(
        replace(
          'src="../../../trainingPlugin_release/widget/common/main.js"',
          'src="../../widget/common/main.js"'
        )
      )
      .pipe(
        replace(
          'href="../../../trainingPlugin_release/style/styleControl.css"',
          'href="../../style/styleControl.css"'
        )
      )
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest(destinationFolder))
  );
};
const minifyHTMLWidget = () => {
  return src("widget/*.html")
    .pipe(
      replace(
        'src="../../trainingPlugin_release/widget/main.js',
        'src="./main.js'
      )
    )
    .pipe(
      replace(
        'src="../../trainingPlugin_release/widget/common/main.js',
        'src="./common/main.js'
      )
    )
    .pipe(
      replace(
        'href="../../trainingPlugin_release/style/styleWidget.css',
        'href="../style/styleWidget.css'
      )
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(destinationFolder + "/widget"));
};

// resources folder
// images
const minifyImages = () => {
  return src("resources/*").pipe(
    imagemin().pipe(dest(destinationFolder + "/resources"))
  );
};

// global file
const minifyGlobalFile = () => {
  return src(["plugin.json", "README.md"], { base: "." }).pipe(
    dest(destinationFolder)
  );
};

const watchTask = () => {
  watch("control/content/js/*.js", minifyContent);
  watch("control/introduction/js/*.js", minifyIntroduction);
  watch("control/language/js/*.js", minifyLanguage);
  watch("widget/app.js", minifyWidget);
  watch(
    [
      "widget/common/controllers/*.js",
      "widget/common/helper/*.js",
      "widget/common/js/*.js",
      "widget/common/model/*.js",
      "widget/common/repository/*.js",
      "widget/common/shared/*.js",
    ],
    minifyWidgetCommon
  );
  watch(
    [
      "control/content/*.css",
      "control/introduction/*.css",
      "control/language/*.css",
    ],
    minifyStyleControl
  );
  watch("widget/*.css", minifyStyleWidget);
  watch(
    [
      "control/content/*.html",
      "control/introduction/*.html",
      "control/language/*.html",
    ],
    minifyHTMLControl
  );
  watch("widget/*.html", minifyHTMLWidget);
  watch("resources/*", minifyImages);
  watch(["plugin.json", "README.md"], minifyGlobalFile);
};

exports.default = series(
  minifyContent,
  minifyIntroduction,
  minifyLanguage,
  minifyWidget,
  minifyWidgetCommon,
  minifyStyleControl,
  minifyStyleWidget,
  minifyHTMLControl,
  minifyHTMLWidget,
  minifyImages,
  minifyGlobalFile,
  watchTask
);
