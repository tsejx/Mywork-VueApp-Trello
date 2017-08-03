require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
const fs = require('fs') // 引入 file system
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
const Formidable = require('formidable') // 引入上传文件模块

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
// 处理文件上传模
app.post('/fileupdate', (req, res) => {
	//res.set('Access-Control-Allow-Origin', '*')
  let form = new Formidable.IncomingForm()
  let newFileName = ''
  let newFilePath = ''
  
  form.encoding = 'utf-8'
  form.uploadDir = path.resolve(__dirname, '../', 'static' , 'img')
  form.keepExtensions = true;  // 保留扩展名

  form.maxFieldsSize = 3 * 1024 * 1024;  // 限制上传文件的总大小3mb，默认为2mb

  form.parse(req)
    .on('progress', (received, expected) => {
      console.log(`上传进度:${received / expected * 100}%`)
    })
    .on('fileBegin', (name, file) => {  // 当某个文件开始上传的时候
      console.log(`${file.name}文件正在上传`)
    })
    .on('file', (name, file) => { // 当某个文件上传结束的时候
      let fileExt = path.extname(file.name) // 拿到上传文件的扩展名
      let oldFilePath = path.normalize(file.path); // 拿到上传文件的路径,并进行规范化处理
      newFileName = 'file_' + Date.now() + fileExt
      newFilePath = path.join(__dirname, '../', 'static' , 'img')
      // 对文件进行重命名操作
      fs.rename(oldFilePath, newFilePath + '/' + newFileName, (err) => {
        if(err){
          throw err
          console.log('改名失败!')
          return
        }
        console.log(`改名成功,新文件名为:${newFileName}`)
      })
    })
    .on('end', () => { // 当全部文件上传完成的时候
      console.log(`上传完成.`)
      res.send(newFileName)
    })
    .on('error', (err) => {  // 当发生错误的时候
      console.log(err)
      res.send('Error!')
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
