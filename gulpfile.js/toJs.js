"use strict";
const { dest, src } = require("gulp");
const { folders } = require("./settings.js");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

const get = {
	src: {
		dir: folders.src + "js/",
		files: folders.src + "js/**/*.js",
	},
	dev: {
		dir: folders.dev,
		files: folders.dev + "**/*.js",
	},
	prod: {
		dir: folders.prod,
		files: folders.prod + "**/*.js",
	},
};

function compile(cb) {
	src(get.src.files)
		.pipe(sourcemaps.init())
		.pipe(babel())
		//.pipe(concat("main.js"))
		.pipe(sourcemaps.write("."))
		.pipe(dest(get.dev.dir));
	cb();
}

function minify(cb) {
	pipeline(src(js.dev.files), uglify(), dest(js.prod.dir));
	cb();
}

exports.compileJs = compile;
exports.minifyJs = minify;
exports.getStripts = get;
//markup.src.files
