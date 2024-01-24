module.exports = {
  presets: [
    ['babel-preset-expo'],
  ],
  plugins: [
    ["@babel/plugin-transform-typescript", { "isTSX": true }],
  ],
};
