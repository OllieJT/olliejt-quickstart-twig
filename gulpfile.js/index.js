"use strict";
const { folders } = require("./settings.js");
const { compileJs, minifyJs, getStripts } = require("./toJs.js");
const { compileScss, getStyles } = require("./toCss.js");
const { compileTwig, getMarkup } = require("./toHtml.js");
const { browserSync } = require("./settings.js");
const { watch, series, src, dest } = require("gulp");
const browserSyncInject = require("gulp-browsersync-inject");
var del = require("del");

// TODO: Use gulp-postcss + postcss-cssnext

function syncing(cb) {
	src(getMarkup.src.index)
		.pipe(
			browserSyncInject({
				protocol: "http",
				port: 8080,
			}),
		) // BrowserSync will output the proxy port
		.pipe(dest(getMarkup.dev.dir));
	cb();
}

function watching(cb) {
	browserSync.init({
		server: {
			baseDir: getMarkup.dev.dir,
		},
		port: 8080,
		minify: false,
		cors: true,
	});

	watch(getStyles.src.files, series(compileScss));

	watch(getStripts.src.files, series(compileJs));
	watch(getStripts.dev.files).on("change", browserSync.reload);

	watch(getMarkup.src.files, series(compileTwig));
	watch(getMarkup.dev.files).on("change", browserSync.reload);

	cb();
}

function cleanup(cb) {
	del(folders.dev);
	del(folders.prod);
	cb();
}

const build = series(compileJs, compileTwig, compileScss);
const optimize = series(minifyJs);
const publish = series(build, optimize);

if (process.env.NODE_ENV === "production") {
	exports.default = series(build, optimize);
} else {
	exports.default = series(build, series(syncing, watching));
}

exports.clean = cleanup;
exports.build = build;
exports.publish = publish;

exports.weeb = compileJs;
