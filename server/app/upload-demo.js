
// const address = require('address')
const express = require('express')
const Busboy = require('busboy')
const path = require('path')
const fs = require('fs')
const iconv = require('iconv-lite')
var app = express()

// console.log(9, iconv.decode('ï¼1ï¼åå·çæ¿å±å»ºç­åå¸æ¿å·¥ç¨æ ååå¯ææ æä»¶(1).docx', 'utf8'))
app.get('/', (req, res) => {
  res.send('app index')
})
app.get('/upload/:id', (req, res) => {
  res.send('file')
  console.log(15, req.params)
})
app.post('/upload', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('content-type', 'text/plain;charset=UTF-8')
  var busboy = Busboy({ headers: req.headers })
  var filePath = path.join(path.normalize(__dirname), 'upload')
  var fileInfo = []
  busboy.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info
    // console.log(19, name, filename, encoding, mimeType)
    console.log('filename', filename)
    let _filename = iconv.decode(filename, 'utf8')
    var fstream = fs.createWriteStream(filePath + '/' + _filename)
    fileInfo.push({
      name: iconv.decode(filename, 'utf8'),
      url: filePath + '/' + _filename
    })
    file.on('data', (data) => {
      console.log(21, data, data.length)
      fstream.write(data)
    }).on('end', () => {
      console.log(23, 'end', filePath)
      fstream.end()
    })
      .on('close', () => {
        // console.log(26, 'file done', file)
      })

  }).on('finish', function () {
    console.log('%c req start___________________________-----------------------------------------------------------', 'background:red;color:white;')
    // console.log(33, req.files)
    res.send({
      code: 200, data: fileInfo, msg: '上传完了'
    })
  })
  // console.log(40, res)
  return req.pipe(busboy)
})

app.listen(8000, function () {
  console.log('启动于8000')
})
