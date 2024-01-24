module.exports = {
  presets: [
    ['babel-preset-expo'],
  ],
  plugins: [
    '@parcel/babel-plugin-transform-runtime',
    ["@babel/plugin-transform-typescript", { "isTSX": true }],
  ],
};
