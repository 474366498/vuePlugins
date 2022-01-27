import 'intersection-observer'

import { track } from './sendData'
console.log(4, IntersectionObserver)
// ????  IntersectionObserver.prototype['THROTTLE_TIMEOUT'] = 300

export default class Exposure {
  cacheDataArr: Array<string>
  maxNum: number
  _timer: any
  _observer: any
  constructor(maxNum = 20) {
    this.cacheDataArr = []
    this.maxNum = maxNum
    this._timer = null
    this._observer = null
    this.init()
  }
  init() {
    const self = this
    this.trackFormLocalStorage()
    this.beforeLeaveWebview()
    this._observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry): any => {
        // 出现在视窗
        if (entry.isIntersecting) {
          //  清除定时器
          clearInterval(self._timer)
          let el: HTMLElement = entry.target as HTMLElement
          const elNodeMap: NamedNodeMap = el.attributes
          const tp: string | null = elNodeMap && elNodeMap['track-params'].value
          if (tp == null) return false
          self.cacheDataArr.push(tp)
          self._observer.unobserve(el)
          if (self.cacheDataArr.length >= self.maxNum) {
            self.track()
          } else {
            self.storeIntoLocalStorage(self.cacheDataArr)
            if (self.cacheDataArr.length > 0) {
              self._timer = setInterval(function () {
                self.track()
              }, 2000)
            }
          }
        }
      })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    })
  }
  add(entry: any) {
    let el: HTMLElement = entry.el as HTMLElement
    this._observer && this._observer.observe(el)
  }
  //  埋点上报
  track() {
    const trackData = this.cacheDataArr.splice(0, this.maxNum)
    if (trackData && trackData.length > 0) {
      console.log('准备上报', trackData)
      track(trackData)
      this.storeIntoLocalStorage(this.cacheDataArr)
    } else {
      return false
    }
  }
  //存储到localstorage防止在设定上报时间内用户退出
  storeIntoLocalStorage(data: any[]) {
    window.localStorage.setItem('cacheTrackData', JSON.stringify(data))
  }

  // 首次进入先获取localStorage中的数据，也就是用户上次退出未上报的数据
  trackFormLocalStorage() {
    const cacheData = window.localStorage.getItem('cacheTrackData')
    if (cacheData) {
      track(cacheData)
    }
  }
  // 离开页面进行提交
  beforeLeaveWebview() {
    console.log('ajax 上传')
  }
}