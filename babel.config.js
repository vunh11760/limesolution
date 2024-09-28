module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          app: './app',
          assets: './app/assets',
          utils: './app/utils',
          constants: './app/constants',
        },
      },
    ],
  ],
};
