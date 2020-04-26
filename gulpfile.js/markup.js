"use strict";
const { dest, src } = require("gulp");
const sass = require("gulp-sass");
const twig = require("gulp-twig");
const { markup } = require("./settings.js");

sass.compiler = require("node-sass");

function compile(cb) {
	var localData = {
		title: "Gulp and Twig",
		benefits: ["Fast", "Flexible", "Secure"],
	};

	src(markup.src.file)
		.pipe(
			twig({
				data: localData,
				base: markup.src.dir + "layouts/",
				errorLogToConsole: true,
			}),
		)
		.pipe(dest(markup.dev.dir));
	cb();
}

exports.markupCompile = compile;
//markup.src.file
