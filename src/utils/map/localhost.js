export function getLocation() {
  console.log('local')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(res => {
      let { latitude, longitude } = res.coords
      console.log(30, res, JSON.stringify({ latitude, longitude }))
      sessionStorage.setItem('cityInfo', JSON.stringify({ latitude, longitude }))
    }, err => {
      console.log(20, err)
    })
  } else {
    console.log('不支持')
    console.log(18, returnCitySN)
    var cityInfo = returnCitySN || { cip: '0.0.0.0', cid: '000000', cname: '四川省成都市' }
    sessionStorage.setItem('cityInfo', JSON.stringify(cityInfo))
    console.log(18, cityInfo, returnCitySN)
  }

}