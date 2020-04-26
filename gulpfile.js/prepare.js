"use strict";
const { src, series, dest } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const { styles } = require("./settings.js");

function cssPrefix(cb) {
	src(styles.dev.file)
		.pipe(
			autoprefixer({
				cascade: false,
			}),
		)
		.pipe(dest(styles.dev.dir));
	cb();
}

exports.prefix = series(cssPrefix);
