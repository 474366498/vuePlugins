var http = require('http')
var path = require('path')
var fs = require('fs')
var express = require('express')


var app = express()
var port = process.env.PORT || '8000'

app.get('/', (req, res) => {
  res.send('app index')
})
app.get('/js', (req, res) => {
  // console.log(14, res.socket)
  res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Max-Age', 864000)
  res.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST')
  res.set('Access-Control-Allow-Headers', 'x-requested-with,origin,content-type')
  // path.resolve(__dirname, '../upload/bigFile') + '/'
  let filePath = path.resolve(__dirname, './files')
  console.log(22, filePath)
  var fsData = fs.readFileSync(filePath + '/worker.js', 'utf-8')
  console.log(21, fsData)
  const resData = {
    code: 200,
    data: fsData
  }
  res.send(JSON.stringify(resData))
})

app.listen(port, function () {
  console.log(port)
})

