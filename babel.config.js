module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          screens: './src/screens',
          navigation: './src/navigation',
          components: './src/components',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
