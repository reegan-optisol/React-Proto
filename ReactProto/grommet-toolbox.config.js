import path from 'path';

export default {
  copyAssets: [
    'src/index.html',
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/index.scss',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, './node_modules')
      ]
    }
  },
  devServerPort: 8014,
  devServerProxy: {
    "/rest/*": 'http://localhost:8114',
    "/rest/*": 'http://localhost:8114'
  },
  scsslint: true,
  sync: {
    hostname: 'hostmachine',
    username: 'ligo',
    remoteDestination: '/var/www/html/examples/dist'
  },
  alias: {
    'grommet-templates': path.resolve(__dirname, '../grommet-templates/src/js'),
    'grommet-index/scss': path.resolve(__dirname, '../grommet-index/src/scss'),
    'grommet-index': path.resolve(__dirname, '../grommet-index/src/js'),
    'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
    'grommet': path.resolve(__dirname, '../grommet/src/js')
  },
  devPreprocess: ['set-webpack-alias'],
  distPreprocess: ['set-webpack-alias']
};
