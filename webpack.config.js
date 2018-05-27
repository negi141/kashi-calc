module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',
  //mode: 'production',
 
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/app.jsx',
  output: {
    path: __dirname + '/docs/js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js(x?)$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換。
                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                // webpack の Tree Shaking 機能が使えない
                ['env', {'modules': false}]
              ]
            }
          }
        ]
      }
    ]
  }
};