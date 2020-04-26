"use strict";
const { watch, series, src, dest } = require("gulp");
const { scssCompile } = require("./scss.js");
const { markupCompile } = require("./markup.js");
const { prefix } = require("./prepare.js");
const { styles, markup, browserSync } = require("./settings.js");
const browserSyncInject = require("gulp-browsersync-inject");

const port = 8000;

function syncing(cb) {
	src(markup.src.index)
		.pipe(
			browserSyncInject({
				protocol: "http",
				port: port,
			}),
		) // BrowserSync will output the proxy port
		.pipe(dest(markup.dev.dir));
	cb();
}

function watching(cb) {
	browserSync.init({
		server: {
			baseDir: markup.dev.dir,
		},
		port: port,
		minify: false,
		cors: true,
	});

	watch(styles.src.file, series(scssCompile, prefix));
	watch(markup.src.file, series(markupCompile));
	watch(markup.dev.file).on("change", browserSync.reload);

	cb();
}

exports.livereload = series(syncing, watching);
