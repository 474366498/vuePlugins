var http = require('http')
var koaStatic = require('koa-static')
var path = require('path')
var koaBody = require('koa-body')
var fs = require('fs')
var Koa = require('koa2')


var app = new Koa()
var port = process.env.PORT || '8000'

var uploadHost = `http://localhost:${port}/bigUpload`

app.use(koaBody({
  formidable: {
    uploadDir: path.resolve(__dirname, '../upload/bigFile')
  },
  multipart: true
}))

app.use(koaStatic(path.resolve(__dirname, 'static')))

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
  ctx.set("Access-Control-Max-Age", 864000);
  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  await next();
})

app.use(ctx => {
  // console.log(35, ctx.request)
  var body = ctx.request.body
  var files = ctx.request.files ? ctx.request.files.f1 : []
  var result = []
  var fileToken = body.token
  var fileIndex = body.index
  if (files) {
    console.log(39, files.path, files.name)
  } else {
    console.log(44, body)
  }

  if (files && !Array.isArray(files)) {
    files = [files]
  }

  files && files.forEach(item => {
    // console.log(49, item)
    var path = item.path.replace(/\\/g, '/'),
      fname = item.name,
      nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken;
    if (item.size > 0 && path) {
      var extArr = fname.split('.'),
        ext = extArr[extArr.length - 1];
      fs.renameSync(path, nextPath)

      result.push(uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1))
    }
  })
  console.log(60, result)
  ctx.body = `{
    'fileUrl' : ${JSON.stringify(result)}
  }`

  if (body.type === 'merge') {
    var filename = body.filename,
      chunkcount = body.chunkcount,
      folder = path.resolve(__dirname, '../upload/bigFile') + '/';
    var writeSteam = fs.createWriteStream(`${folder}${filename}`)
    console.log(74, filename,
      chunkcount,
      writeSteam ? writeSteam.path : '合并错误')
    var cindex = 0;
    function mergeFile() {
      var fname = `${folder}${cindex}-${fileToken}`,
        readStream = fs.createReadStream(fname);
      readStream.pipe(writeSteam, { end: false })
      readStream.on('end', function () {
        fs.unlink(fname, function (err) {
          if (err) {
            throw err
          }
        })
        if (cindex + 1 < chunkcount) {
          cindex += 1
          mergeFile()
        }
      })
    }
    mergeFile()
    console.log('merge ok ')
  }

})















var server = http.createServer(app.callback())
server.listen(port)
console.log('big', port)

