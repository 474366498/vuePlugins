import _fs from 'fs'
import _path from 'path'

const modulesFiles = import.meta.globEager('./*.ts')

const modules = []

for (let path in modulesFiles) {
  let file = modulesFiles[path].default
  let key = path.replace('./', '').replace('.ts', '')

  let moduleItem = {
    [key]: file
  }
  modules.push(moduleItem)
  console.log(9, path, file)
}

// var filePath = _path.resolve(__dirname, 'src')
console.log(3, _fs, _path, modulesFiles, modules)

// fileDisplay(filePath)

// function fileDisplay(path: string) {
//   console.log(9, path)
// }



const defectives: Array<any> = []

export default defectives