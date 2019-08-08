
const gulp = require('gulp');
const nodemon = require('nodemon');
const runSequence = require('run-sequence').use(gulp);
const run = require('gulp-run');

const serverPath = './server/src';

const onsServerLog = (log) => {
    console.log(log.message);
}

gulp.task('start:server', () => {
    nodemon(`-w ${serverPath} ${serverPath}`)
        .on('log', onsServerLog);
});

gulp.task('start:client', () => {
    run('npm start').exec();
});

gulp.task('serve', cb => {
    runSequence(['start:server', 'start:client']);
});


gulp.task('default', ['serve']);