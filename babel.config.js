module.exports = function (api) {
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
            '~projects': './src/projects',
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
      'react-native-reanimated/plugin'
    ],
  };
};
