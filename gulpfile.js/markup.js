"use strict";
const { dest, src } = require("gulp");
const sass = require("gulp-sass");
const { markup, browserSync } = require("./settings.js");

sass.compiler = require("node-sass");

function compile(cb) {
	src(markup.src.file).pipe(dest(markup.dev.dir));
	cb();
}

exports.markupCompile = compile;
