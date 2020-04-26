"use strict";
const browserSync = require("browser-sync").create();

const folder = {
	root: "./",
	src: "./src/",
	dev: "./__development/",
	prod: "./__production/",
};

exports.folders = folder;
exports.browserSync = browserSync;
