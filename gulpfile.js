const gulp = require('gulp');
const args = require('yargs').argv;
const config = require('./gulp.config')();
require('dotenv').config();

const $ = require('gulp-load-plugins')({ lazy: true });
const log = require('color-logs')(true, true, 'Api');

gulp.task('db-create', $.shell.task([
    'mysql -u root -h localhost -e "DROP DATABASE IF EXISTS nerapi;CREATE DATABASE nerapi;"',
    'mysql -u root -h localhost nerapi < db/local.sql',
]));

function serve(isDev) {
    log.info(`Running in ${isDev ? 'development' : 'production'} mode...`);
    if (isDev) {
        $.nodemon({
            script: 'app.js',
            tasks: ['db-create'],
        });
    } else {
        $.nodemon({
            script: 'app.js',
        });
    }
}

gulp.task('develop', ['db-create'], () => { serve(true); });