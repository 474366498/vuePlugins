import { uploadFile } from '@/api/index.js'

const userId = localStorage.getItem('userId'),
  busType = 'text_editor',
  Authorization = 'Bearer ' + localStorage.getItem('token')

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader
  }
  upload() {
    return this.loader.file.then(file => new Promise((resolve, reject) => {
      var formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)
      formData.append('busType', busType)
      formData.append('Authorization', Authorization)
      uploadFile
        .batchUpload(formData).then(res => {
          console.log(20, res)
          resolve(res)
        })
    }))
  }
}

const customUploadAdapterPlugin = function (editor) {
  console.log(28, editor)
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    console.log(29, loader)
    return new MyUploadAdapter(loader)
  }
}

export {
  customUploadAdapterPlugin,
  MyUploadAdapter
}