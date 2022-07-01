<template>
  <section class="flex flex-dic-c">
    <div class="flex flex-jc-sb">
      <div id="Map" class="map">Map</div>
      <div id="glMap" class="map">glMap</div>
    </div>
  </section>
</template>
<script type='text/typescript'>
import {getLocation} from '@/utils/map/localhost.js'
 
import {bMap , bMapJsonp} from '@/utils/map/b.js'
import {defineComponent  , reactive } from 'vue' 
  export default defineComponent ({ 
    name : 'bMap',
    cname:'百度地图',
    beforeRouteEnter(f,t,n){
      getLocation()
      n()
    },
    beforeCreate(){

    },
    setup(context,props){
      // console.log(12,context,props)
      const BMap = reactive({})
      const mapObj = reactive({})

      bMap().then(res=>{
        console.log(15,res)
        mapInit(res)
        BMap.value = res 
      }).catch(err=>{
        console.log(17,err)
      })
      const mapInit  = (BMap) =>{
        let cityInfo = JSON.parse(sessionStorage.getItem('cityInfo') ||'{}')
        console.log(29,cityInfo)
        const map = new BMap.Map('Map',{
          coordsType : 5
        })
        if(cityInfo.latitude && cityInfo.longitude){ // 经纬度
          let { latitude , longitude } = cityInfo
          let point = new BMap.Point(longitude,latitude)
          console.log(32,latitude , longitude,point)
          map.centerAndZoom(point,10)
        }else{  // 城市名
          console.log('城市名')
           map.centerAndZoom(cityInfo.cname || '成都',10)
        }
        map.enableScrollWheelZoom(true)
        mapObj.value = map
      }
      return {
        BMap ,

      }
    },
    methods : {} 
  })
</script>

<style lang="scss" scoped>
.map{
  min-width:600px;
  max-width:40vw;
  height:600px;
}
</style>