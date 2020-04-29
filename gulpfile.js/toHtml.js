"use strict";
const { dest, src } = require("gulp");
const twig = require("gulp-twig");
const { folders } = require("./settings.js");

const get = {
	src: {
		dir: folders.src,
		files: folders.src + "**/*.twig",
		index: folders.src + "index.twig",
	},
	dev: {
		dir: folders.dev,
		files: folders.dev + "**/*.html",
		index: folders.dev + "index.html",
	},
	prod: {
		dir: folders.prod,
		files: folders.prod + "**/*.html",
		index: folders.prod + "index.html",
	},
};

function compile(cb) {
	var localData = {
		title: "Gulp and Twig",
		benefits: ["Fast", "Flexible", "Secure"],
	};

	src(get.src.files)
		.pipe(
			twig({
				data: localData,
				base: get.src.dir + "layouts/",
				errorLogToConsole: true,
			}),
		)
		.pipe(dest(get.dev.dir));
	cb();
}

exports.compileTwig = compile;
exports.getMarkup = get;
