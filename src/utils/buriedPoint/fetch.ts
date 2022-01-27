import Axios from 'axios'
import config from './config'

const service = Axios.create({
  baseURL: config.serverUrl,
  timeout: config.serverTimeout
})

const trackPublicParams = {
  uid: ''
}

service.interceptors.request.use(config => {
  config.data = Object.assign({}, config.data, trackPublicParams)
  return config
}, error => {
  return Promise.reject(error)
})

export default service