"use strict";
const { dest, src } = require("gulp");
const { folders } = require("./settings.js");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

const dir = {
	src: {
		dir: folders.src + "js/",
		file: folders.src + "js/**/*.js",
	},
	dev: {
		dir: folders.dev,
		file: folders.dev + "**/*.js",
	},
	prod: {
		dir: folders.prod,
		file: folders.prod + "**/*.js",
	},
};

function compile(cb) {
	src(dir.src.file)
		.pipe(sourcemaps.init())
		.pipe(babel())
		//.pipe(concat("main.js"))
		.pipe(sourcemaps.write("."))
		.pipe(dest(dir.dev.dir));
	cb();
}

function minify(cb) {
	pipeline(src(js.dev.file), uglify(), dest(js.prod.dir));
	cb();
}

exports.compileJs = compile;
exports.minifyJs = minify;
exports.dirScripts = dir;
//markup.src.file
