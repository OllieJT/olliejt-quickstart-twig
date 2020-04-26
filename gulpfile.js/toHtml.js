"use strict";
const { dest, src } = require("gulp");
const twig = require("gulp-twig");
const { folders } = require("./settings.js");

const dir = {
	src: {
		dir: folders.src,
		file: folders.src + "**/*.twig",
		index: folders.src + "index.twig",
	},
	dev: {
		dir: folders.dev,
		file: folders.dev + "**/*.html",
		index: folders.dev + "index.html",
	},
	prod: {
		dir: folders.prod,
		file: folders.prod + "**/*.html",
		index: folders.prod + "index.html",
	},
};

function compile(cb) {
	var localData = {
		title: "Gulp and Twig",
		benefits: ["Fast", "Flexible", "Secure"],
	};

	src(dir.src.file)
		.pipe(
			twig({
				data: localData,
				base: dir.src.dir + "layouts/",
				errorLogToConsole: true,
			}),
		)
		.pipe(dest(dir.dev.dir));
	cb();
}

exports.compileTwig = compile;
exports.dirMarkup = dir;
