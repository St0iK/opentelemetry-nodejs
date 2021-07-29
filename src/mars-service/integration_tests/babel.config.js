module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime'],
  env: {
    development: {
      sourceMaps: 'inline',
      retainLines: true,
    },
  },
};
