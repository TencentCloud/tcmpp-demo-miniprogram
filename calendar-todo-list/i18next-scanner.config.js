module.exports = {
  input: [
    './src/**/*.{js,jsx,tsx,ts}',
    '!./src/packageA/components/ec-canvas/*'
  ],
  output: './', //输出目录
  options: {
    // debug: true,
    func: {
      list: ['t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    lngs: ['zh-CN', 'en', 'id'],
    defaultLng: 'en',
    defaultValue: function (lng, ns, key) {
      if (lng === 'zh-CN') {
        console.log(key)
        return key;
      }
      return '';
    },
    resource: {
      loadPath: './src/i18n/{{lng}}.json', //输入路径
      savePath: './src/i18n/{{lng}}.json', //输出路径
      jsonIndent: 2,
      lineEnding: '\n'
    },
    keepRemoved: true,
    removeUnusedKeys: true,
  },
};