{/* 



<script src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=您的密钥"></script> 

https://blog.csdn.net/m0_54804239/article/details/125290086

https://www.cnblogs.com/googlegis/p/14639627.html

https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html

*/}

export function bMapJsonp() {
  return new Promise((resolve, reject) => {
    window.onBMapInitialize = () => resolve(BMap)
    const scriptEl = document.createElement('script')
    scriptEl.type = 'text/javascript'
    scriptEl.setAttribute('id', 'b-gl-map-script')
    scriptEl.src =
      `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=onBMapInitialize`
    scriptEl.onerror = reject
    document.body.appendChild(scriptEl)
  })
}

let ak = 'eYitAxjBztuzvI8ulZXg7mu6Ue7otzDb'
export function bMap() {
  return new Promise((resolve, reject) => {
    // console.log(13, ak)
    asyncLoadBaiduJs(ak)
      .then((response) => {
        // console.log(16, response)
        asyncLoadJs('http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay.js')
          .then((res) => {
            asyncLoadJs('http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js')
              .then(r => {
                resolve()
                return true
              }).catch(err => {
                reject(err)
              })
          }).catch(err => {
            reject(err)
          })
        resolve(response)
      }).catch(err => {
        reject(err)
      })
  })

}

export function asyncLoadBaiduJs(ak) {
  return new Promise((resolve, reject) => {
    if (typeof BMap !== 'undefined') {
      // console.log(38, BMap)
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function () {
      resolve(BMap)
    }
    let script = document.createElement('script')
    script.setAttribute('id', 'b-map-script')
    script.type = "text/javascript"
    script.src = `http://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=onBMapCallback`
    // console.log(16, script)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export function asyncLoadJs(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.head.appendChild(script)
    script.onload = () => {
      resolve()
    }
    script.onerror = reject
  })
}



