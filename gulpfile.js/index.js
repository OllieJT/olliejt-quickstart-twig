"use strict";
const { folders } = require("./settings.js");
const { compileJs, minifyJs, dirScripts } = require("./toJs.js");
const { compileScss, dirStyles } = require("./toCss.js");
const { compileTwig, dirMarkup } = require("./toHtml.js");
const { browserSync } = require("./settings.js");
const { watch, series, src, dest } = require("gulp");
const browserSyncInject = require("gulp-browsersync-inject");
var del = require("del");

// TODO: Use gulp-postcss + postcss-cssnext

function syncing(cb) {
	src(dirMarkup.src.index)
		.pipe(
			browserSyncInject({
				protocol: "http",
				port: 8080,
			}),
		) // BrowserSync will output the proxy port
		.pipe(dest(dirMarkup.dev.dir));
	cb();
}

function watching(cb) {
	browserSync.init({
		server: {
			baseDir: dirMarkup.dev.dir,
		},
		port: 8080,
		minify: false,
		cors: true,
	});

	watch(dirStyles.src.file, series(compileScss));

	watch(dirScripts.src.file, series(compileJs));
	watch(dirScripts.dev.file).on("change", browserSync.reload);

	watch(dirMarkup.src.file, series(compileTwig));
	watch(dirMarkup.dev.file).on("change", browserSync.reload);

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
