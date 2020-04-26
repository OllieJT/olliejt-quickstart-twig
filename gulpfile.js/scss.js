"use strict";
const { dest, src } = require("gulp");
const sass = require("gulp-sass");
const { styles, browserSync } = require("./settings.js");

sass.compiler = require("node-sass");

const options = () => {
	if (process.env.NODE_ENV === "production") {
		return sass({
			omitSourceMapUrl: true,
			outputStyle: "compressed",
			sourceComments: false,
			sourceMap: false,
		});
	} else {
		return sass({
			indentType: "tab",
			indentWidth: 1,
			omitSourceMapUrl: false,
			outFile: styles.dev.dir,
			outputStyle: "nested",
			precision: 3,
			sourceComments: true,
			sourceMap: true,
			sourceMapContents: true,
		});
	}
};

function compile(cb) {
	src(styles.src.file)
		.pipe(options().on("error", sass.logError))
		.pipe(dest(styles.dev.dir))
		.pipe(browserSync.stream());
	cb();
}

exports.scssCompile = compile;
