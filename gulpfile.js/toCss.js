"use strict";
const { dest, src, series } = require("gulp");
const sass = require("gulp-sass");
const { folders, browserSync } = require("./settings.js");
const autoprefixer = require("gulp-autoprefixer");

sass.compiler = require("node-sass");

const dir = {
	src: {
		dir: folders.src + "scss/",
		file: folders.src + "scss/**/*.scss",
	},
	dev: {
		dir: folders.dev + "css/",
		file: folders.dev + "css/**/*.css",
	},
	prod: {
		dir: folders.prod + "css/",
		file: folders.prod + "css/**/*.css",
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
			outFile: dir.dev.dir,
			outputStyle: "nested",
			precision: 3,
			sourceComments: true,
			sourceMap: true,
			sourceMapContents: true,
		});
	}
};

function compile(cb) {
	src(dir.src.file)
		.pipe(options().on("error", sass.logError))
		.pipe(dest(dir.dev.dir))
		.pipe(browserSync.stream());
	cb();
}

function prefix(cb) {
	src(dir.dev.file)
		.pipe(
			autoprefixer({
				cascade: false,
			}),
		)
		.pipe(dest(dir.dev.dir));
	cb();
}

exports.compileScss = series(compile, prefix);
exports.dirStyles = dir;
