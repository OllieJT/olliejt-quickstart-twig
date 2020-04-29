"use strict";
const { dest, src, series } = require("gulp");
const sass = require("gulp-sass");
const { folders, browserSync } = require("./settings.js");
const autoprefixer = require("gulp-autoprefixer");

sass.compiler = require("node-sass");

const get = {
	src: {
		dir: folders.src + "scss/",
		files: folders.src + "scss/**/*.scss",
	},
	dev: {
		dir: folders.dev + "css/",
		files: folders.dev + "css/**/*.css",
	},
	prod: {
		dir: folders.prod + "css/",
		files: folders.prod + "css/**/*.css",
	},
};

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
			outfiles: get.dev.dir,
			outputStyle: "nested",
			precision: 3,
			sourceComments: true,
			sourceMap: true,
			sourceMapContents: true,
		});
	}
};

function compile(cb) {
	src(get.src.files)
		.pipe(options().on("error", sass.logError))
		.pipe(dest(get.dev.dir))
		.pipe(browserSync.stream());
	cb();
}

function prefix(cb) {
	src(get.dev.files)
		.pipe(
			autoprefixer({
				cascade: false,
			}),
		)
		.pipe(dest(get.dev.dir));
	cb();
}

exports.compileScss = series(compile, prefix);
exports.getStyles = get;
