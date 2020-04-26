"use strict";
const browserSync = require("browser-sync").create();

const folder = {
	root: "./",
	src: "./src/",
	dev: "./__development/",
	prod: "./__production/",
};

function scss(path) {
	return path + "scss/";
}
function css(path) {
	return path + "css/";
}

const style = {
	src: {
		dir: scss(folder.src),
		file: scss(folder.src) + "**/*.scss",
	},
	dev: {
		dir: css(folder.dev),
		file: css(folder.dev) + "**/*.css",
	},
	prod: {
		dir: css(folder.prod),
		file: css(folder.prod) + "**/*.css",
	},
};

const markup = {
	src: {
		dir: folder.src,
		file: folder.src + "**/*.twig",
		index: folder.src + "index.twig",
	},
	dev: {
		dir: folder.dev,
		file: folder.dev + "**/*.html",
		index: folder.dev + "index.html",
	},
	prod: {
		dir: folder.prod,
		file: folder.prod + "**/*.html",
		index: folder.prod + "index.html",
	},
};

exports.folders = folder;
exports.styles = style;
exports.markup = markup;
exports.browserSync = browserSync;
