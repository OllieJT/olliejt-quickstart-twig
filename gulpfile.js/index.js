"use strict";
const { series, src } = require("gulp");
const { scssCompile } = require("./scss.js");
const { prefix } = require("./prepare.js");
const { folders } = require("./settings.js");
const { livereload } = require("./livereload.js");
var del = require("del");

// TODO: Use gulp-postcss + postcss-cssnext

function cleanup(cb) {
	del(folders.dev);
	del(folders.prod);
	cb();
}

if (process.env.NODE_ENV === "production") {
	exports.default = series(scssCompile, prefix);
} else {
	exports.default = series(scssCompile, livereload);
}

exports.build = prefix;
exports.clean = cleanup;
