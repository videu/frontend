/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file Build tasks for gulp.
 *
 * @license
 * Copyright (c) 2020 Felix Kopp <sandtler@sandtler.club>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY of FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('del');
const spawn = require('child_process').spawn;
const fs = require('fs');

function writeEnv() {
    const env =
        process.env.NODE_ENV === 'development' ? 'development' : 'production';

    fs.writeFileSync(
        __dirname + '/env.js',
        `window._videuEnv = '${env}';`
    );
}

/** Clean the prpl-server build directory in `server/build`. */
gulp.task('prpl-server:clean', () => {
    return del('server/build');
});

/**
 * Copy the prpl-server build files to the server directory while remaining
 * the node_modules directory so services like App Engine will upload it.
 */
gulp.task('prpl-server:build', () => {
    writeEnv();

    const pattern = 'node_modules';
    const replacement = 'node_assets';

    return gulp
        .src('build/**')
        .pipe(
            rename(path => {
                path.basename = path.basename.replace(pattern, replacement);
                path.dirname = path.dirname.replace(pattern, replacement);
            })
        )
        .pipe(replace(pattern, replacement))
        .pipe(gulp.dest('server/build'));
});

gulp.task(
    'prpl-server',
    gulp.series('prpl-server:clean', 'prpl-server:build')
);

/**
 * Gulp task to run `tsc --watch` and `polymer serve` in parallel.
 */
gulp.task('serve', () => {
    writeEnv();
    const spawnOpts = {
        /*
         * `shell` option for Windows compatibility.  See:
         * <https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows>
         */
        shell: true,
        stdio: 'inherit'
    };
    spawn('tsc', ['--watch'], spawnOpts);
    spawn('polymer', ['serve'], spawnOpts);
});
