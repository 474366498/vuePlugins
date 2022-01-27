const path = require('path')
const fs = require('fs')


async function mkdirPath(pathStr) {
  var projectPath = path.join(process.cwd())
  var tempDirArray = pathStr.split(/\\|\//g)
  console.log(tempDirArray, tempDirArray.length)
  for (let i = 0; i < tempDirArray.length; i++) {
    projectPath = projectPath + '\\' + tempDirArray[i]
    console.log(10, projectPath, tempDirArray[i])
    let isFile = await isFileExisted(projectPath)
    if (isFile) {
      console.log('不存在', tempDirArray[i])
      let tempstats = fs.statSync(projectPath)
      console.log(12, tempstats.isDirectory(), projectPath)
      if (!(tempstats.isDirectory())) {
        console.log('created ')
        fs.unlinkSync(projectPath)
        fs.mkdirSync(projectPath)
      }
    } else {
      console.log(19, 'asdfasdf')
      fs.mkdirSync(projectPath)
    }
  }
  console.log(24, projectPath)
  return projectPath
}

function isFileExisted(path_way) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, fs.constants.F_OK, err => {
      console.log(30, err)
      if (err) {
        resolve(false)   // 不存在
      } else {
        resolve(true)  // 存在
      }
    })
  })
}

module.exports = mkdirPath




