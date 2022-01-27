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

            '~components': './src/projects/Trimmer/src/components',
            '~hooks': './src/projects/Trimmer/src/hooks',
            '~types': './src/projects/Trimmer/src/types',
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
