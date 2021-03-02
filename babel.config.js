const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'cjs',
        corejs: 3,
        useBuiltIns: 'usage',
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ]
}

module.exports = api => {
  api.cache(true)

  return babelConfig
}

module.exports.babelConfig = babelConfig
