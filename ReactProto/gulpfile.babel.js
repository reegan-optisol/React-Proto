import gulp from 'gulp';
import { argv } from 'yargs';
import grommetToolbox, { getOptions } from 'grommet-toolbox';

gulp.task('set-webpack-alias', function () {
  const options = getOptions();
  if (options.alias && argv.useAlias) {
    options.webpack.resolve.alias = options.alias;
  }
});

grommetToolbox(gulp);
