/**
 * gulpfile.babel.js
 * 
 * @author e-freak
 */

import gulp from 'gulp';
import babel from 'gulp-babel';

import remove from 'del';



const mainSourceDir   = 'src/main/js';
const testSourceDir   = 'src/test/js';
const mainTargetDir   = 'build';
const testTargetDir   = 'cache/test';

gulp.task('clean', [ 'clean-main', 'clean-test' ], () => {
});

gulp.task('clean-main', remove.bind(null,
    [ mainTargetDir ]
));

gulp.task('clean-test', remove.bind(null,
    [ testTargetDir ]
));

gulp.task('compile', [ 'clean-main' ], () => {
    return gulp.src(
        `${mainSourceDir}/**/*.js`
    ).pipe(
        babel()
    ).pipe(
        gulp.dest(mainTargetDir)
    );
});

gulp.task('ready-to-test', [ 'clean-test' ], () => {
    return gulp.src(
        [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js` ]
    ).pipe(
        gulp.dest(testTargetDir)
    );
});
