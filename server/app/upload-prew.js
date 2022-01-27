/**
 * 服务入口
 */
var http = require('http');
var koaStatic = require('koa-static');
var path = require('path');
var koaBody = require('koa-body');
var fs = require('fs');
var Koa = require('koa2');

var app = new Koa()
var port = process.env.PORT || 8000

var uploadHost = `http://localhost:${port}/uploads`

app.use(koaBody({
  formidable: {
    uploadDir: path.resolve(__dirname, '../upload/prew')
  },
  multipart: true
}))


app.use(koaStatic(
  path.resolve(__dirname, '../static')
))

app.use(async (ctx, next) => {
  console.log(27, ctx.headers.origin)
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin)
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Max-Age', 864000)
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST')
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with,origin,content-type')
  await next()
})

app.use((ctx) => {
  console.log(39, ctx.request.files)
  var files = ctx.request.files ? ctx.request.files.file : []
  var result = []
  // console.log(36, files, Array.isArray(files))
  if (!Array.isArray(files)) {
    files = [files]
  }
  console.log(45, files)
  files && files.forEach((file) => {
    console.log(47, file.path)
    var path = file.path.replace(/\\/g, '/')
    var fname = file.name
    var nextPath = path + fname
    if (file.size > 0 && path) {
      var extArr = fname.split('.')
      var ext = extArr[extArr.length - 1]
      var nextPath = path + '.' + ext
      fs.renameSync(path, nextPath)
      result.push({ name: fname, url: uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1) })
    }
  })
  ctx.body = `{"fileUrl":${JSON.stringify(result)}}`
})


var server = http.createServer(app.callback())
server.listen(port)
console.log('server run', port)



















