const uploadFile = {
  // 头像上传 头像 logo
  txUpload(data) {
    // return http.post(`/txUpload`, data)
  },
  // 单方件上传
  upload(data) {
    // return http.post(`/upload`, data)
  },
  // 多文件上传
  batchUpload(data) {
    console.log(14, data)
    // return http.post(`/batchUpload`, data)
  },
  // 根据url 删除文件
  deleteByUrl(data) {
    // return http.get(`/deleteByUrl`, { data })
  }
}


export default uploadFile