const fontsContext = require.context(
  '!!file-loader?name=assets/fonts/[name].[ext]!.',
  true,
  /\.(svg|ttf|woff)$/,
);

fontsContext.keys().forEach(fontsContext);
