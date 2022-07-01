export function tMap() {
  return new Promise((resolve, reject) => {
    window.init = function () {
      console.log(4, qq)
      resolve(qq)
    }
    var script = document.createElement('script')
    script.id = 't-map-script'
    script.type = 'text/javascript'
    script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=YPYBZ-6ABCX-M4F45-TAPDX-H2WGJ-LGFPB'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
