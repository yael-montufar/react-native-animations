module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: ['./'],
          alias: {
            '~assets': './src/assets',
            '~components': './src/components',
            '~hooks': './src/hooks',
            '~layouts': './src/layouts',
            '~routes': './src/routes',
            '~screens': './src/screens',
            '~templates': './src/templates',
            '~tmp': './src/tmp',
            '~utils': './src/utils',
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ]
        }
      ],
    ],
  };
};
