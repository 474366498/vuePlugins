<template>
  <section class="flex flex-dir-c">
    <p><a href="https://lbsyun.baidu.com/jsdemo.htm#SetMapElementRoadNet" target="_blank">更多</a></p>
    <div class="flex flex-ai-c" style="padding:20px;">
      <el-input-number v-model="level" :min="4" :max="20" :step="1"  />
      <div class="flex flex-dir-c">
        <div> 经度 <el-input-number size="mini" v-model="center[0]" :min="60" :max="140" :step="0.1" /></div>
        <div> 纬度 <el-input-number size="mini" v-model="center[1]" :min="0" :max="50" :step="0.1" /></div>
      </div>
      <el-button size="small" @click="setMapLoc">setLoc</el-button>
      <el-button size="small" @click="getMapLoc">getLoc</el-button>
      <el-switch size="small" v-model="d_3" active-text="GL开" inactive-text="GL隐"/>
    </div>  
    <div class="flex flex-jc-sb">
      <div id="Map" class="map">Map</div>
      <div id="glMap" class="map">glMap</div>
    </div>
  </section>
</template>
<script type='text/typescript'>
import {getLocation} from '@/utils/map/localhost.js'
 
import {bMap , bMapJsonp} from '@/utils/map/b.js'
import {defineComponent  , reactive , ref ,watch } from 'vue' 
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
      let level = ref(10)
      let center = ref([])
      let d_3 = ref(false)
      const BMap = reactive({})
      const BMapGl = reactive({})
      const mapObj = reactive({})
      const mapGlObj = reactive({})

      bMap().then(res=>{
        console.log(15,res)
        mapInit(res)
        BMap.value = res 
      }).catch(err=>{
        console.log(17,err)
      })
      bMapJsonp().then(res=>{
        console.log(53,res)
        // mapGlInit(res)
        BMapGl.value = res
      }).catch(error=>{
        console.log(error)
      })
      // 普通地图初始化
      const mapInit  = (BMap) =>{
        let cityInfo = JSON.parse(sessionStorage.getItem('cityInfo') ||'{}')
        console.log(29,cityInfo  , BMap)
        const map = new BMap.Map('Map',{
          coordsType : 5
        })
        let lev = level.value
        if(cityInfo.latitude && cityInfo.longitude){ // 经纬度
          let { latitude , longitude } = cityInfo
          let point = new BMap.Point(longitude,latitude)
          center.value = [longitude,latitude]
          console.log(32,latitude , longitude,point)
          map.centerAndZoom(point,lev)
        }else{  // 城市名
          console.log('城市名')
          map.centerAndZoom(cityInfo.cname || '成都',lev)
        }
        map.enableScrollWheelZoom(true)
        mapObj.value = map
      }

      // gl地图初始化
      const mapGlInit = () =>{
        var map = new BMapGl.value.Map('glMap')
        let {lng , lat } = mapObj.value.getCenter()
        let point = new BMapGl.value.Point(lng,lat)
        mapGlObj.value = map 
        console.log(81,map,point ,mapGlObj)

        map.centerAndZoom(new BMapGl.value.Point(lng,lat),level.value)
        map.enableScrollWheelZoom(true)
        map.setHeading(64.6)
        map.setTilt(70)
      }

      watch(()=>level.value, (newV,oldV)=>{
        console.log(newV)
        if(newV > oldV){
          mapObj.value.zoomIn()
        }else if(newV < oldV){
          mapObj.value.zoomOut()
        }
      })
      watch(()=>d_3.value , (newV,oldV)=>{
        console.log(80,newV)
        if(newV && !mapGlObj.value){
          mapGlInit()
        }
      })
      const setMapLoc = ()=>{
        console.log('set')
        let [lng , lat ] = center.value 
        let point = new BMap.value.Point(lng , lat)
        mapObj.value.setCenter(point)
      }
      const getMapLoc = ()=>{
        console.log(mapObj.value.getCenter())
      }


      return {
        level,
        center ,
        d_3 ,
        BMap ,
        mapObj,
        BMapGl ,
        mapGlObj ,
        setMapLoc ,
        getMapLoc

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