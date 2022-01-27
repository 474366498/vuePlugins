import request from './fetch'

// 发送上报数据  @param {Object} data 
function _track(data: Object) {
  return request({
    url: 'track',
    method: 'post',
    data
  })
}

export function track(params: Object) {
  console.log('sendData.ts', 13, `params : ${params}`, params)
  // _track(params)
}