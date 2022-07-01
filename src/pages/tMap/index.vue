<template>
  <section class="flex flex-dir-c flex-ai-c flex-jc-c">
    <div class="flex" style="padding:20px;">
      <a href="https://lbs.qq.com/webDemoCenter/javascriptV2/polygon/overlay" target="_blank"> 更多</a>
      <el-switch v-model="radio" active-text="单标" inactive-text="多标"></el-switch>
      <el-switch v-model="drag"  active-text="拖动" inactive-text="禁拖"></el-switch>
      <el-select v-model="mapType" >
        <el-option v-for="item in mapTypes" :key="item.id" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-switch v-model="road" active-text="开启" inactive-text="关闭"></el-switch>
    </div>
    <div id ="map" class="flex flex-jc-c">腾讯地图 vue3 </div>
    <p>中心{{center}}  当前地图中心{{moveInfo}} 标记点个数{{markerList.length}}</p>
    <div class="flex flex-jc-sb">
      <el-button @click="getCenter">getCenterInfo</el-button>
    </div>
  </section>
</template>

<script lang="ts">
// https://www.icode9.com/content-4-911761.html
import {getLocation} from '@/utils/map/localhost.js'
import {tMap} from '@/utils/map/t.js'
import { defineComponent, reactive, ref , watch } from 'vue'
console.log(10,tMap)
export default defineComponent({
  name : 'tMap',
  cname : '腾讯地图',
  beforeCreate(){

  },
  created () {
    
    // this.mapInit()
  },
  methods : {
    
  },
  setup() {
    // 
    let radio = ref(true)
    let drag = ref(true)
    let road = ref(false)

    const  mapType = ref('普通街道')
    const  mapTypes = reactive([
      {id:'type_01',label:'普通街道',value:'roadmap'},
      {id:'type_02',label:'卫星地图',value:'satellite'},
      {id:'type_03',label:'卫星地图(路网)',value:'hybrid'}
    ])
    // 地图实例
    var mapObj = reactive({})
    var mapQQ = reactive({})

    // 地图中心点
    var center = ref([])
    // 地图移动信息
    var moveInfo = ref({})

    // 标记点
    var markerList = ref([])
    try {
      getLocation()
    }catch(err){
      console.log('getLocation error')
    }
    let cityInfo = JSON.parse(sessionStorage.getItem('cityInfo'))
    console.log(65,cityInfo , center)
    if(!cityInfo){
      console.log('。。。')
      setTimeout(() => {
        beforeInit()
      }, 20);
    }else{
      setTimeout(() => {
        beforeInit()
      }, 20);
      
    }
    const beforeInit = () =>{
      let cityInfo = JSON.parse(sessionStorage.getItem('cityInfo'))
      if(cityInfo.latitude && cityInfo.longitude){
        let {latitude , longitude} = cityInfo
        console.log(67 , latitude , longitude)
        center.value = [latitude , longitude]
      }else{
        let {cname} = cityInfo 
        tMap().then(qq => {
          let geo = new qq.maps.Geocoder()
          console.log(cname)
          geo.getLocation(cname)
          geo.setComplete(res=>{
            console.log(res)
            let {lat,lng} = res.detail.location 
            center.value = [lat,lng]
            let _cityInfo = Object.assign({},cityInfo,{ latitude:lat, longitude:lng})
            sessionStorage.setItem('cityInfo',JSON.stringify(_cityInfo))
          })
          geo.setError(err=>{
            console.log(err)
          })
        })
      }
    }
    // center 监听
    watch(()=>center.value,(newV,oldV)=>{
      console.log(39,newV,mapInit )
      mapInit(newV)
    })
    watch(()=>moveInfo.value,(newV,oldV) =>{
      let { lat , lng } = newV 
      let oLat = oldV.lat , oLng = oldV.lng 
      let cnString = ''
      if(oLng < lng){
        cnString +='右'
      }else{
        cnString +='左'
      }
      if(oLat < lat){
        cnString +='上'
      }else{
        cnString +='下'
      }
      console.log(cnString)
    })

    watch(()=>mapType.value,(newV,oldV)=>{
      let type = newV.toUpperCase()
      mapObj.value.setMapTypeId(mapQQ.value.MapTypeId[type])
    })

    watch(()=>road.value,(newV,oldV)=>{
      if(newV){
        mapRoadInit(center.value)
      }else{
        mapInit(center.value)
      }
    })
    const mapRoadInit = center =>{
      let [lat , lng] = center
      console.log(42,lat,lng)
      tMap().then(qq => {
        console.log(34,qq , center.value)
        var map = new qq.maps.Map(
          'map',
          {
            center: new qq.maps.LatLng(lat||30.593038,lng||104.053931) ,
            zoom : 10
          }
        )
        console.log(57,qq.maps,map)
        
        let navControl = new qq.maps.NavigationControl({
          align : qq.maps.ALIGN.TOP_LEFT ,
          margin : new qq.maps.Size(5,10) ,
          map 
        })
        let layer = new qq.maps.TrafficLayer()
        console.log(layer)
        layer.setMap(map)

        mapObj.value = map
        mapQQ.value = qq.maps
      })
    }

    const mapInit = (center) => {
      let [lat , lng] = center
      console.log(42,lat,lng)
      tMap().then(qq => {
        console.log(34,qq , center.value)
        var map = new qq.maps.Map(
          'map',
          {
            center: new qq.maps.LatLng(lat||30.593038,lng||104.053931) ,
            zoom : 10
          }
        )
        console.log(57,qq.maps,map)
        mapObj.value = map
        mapQQ.value = qq.maps
        
        qq.maps.event.addListener(map,'click',function(event){
          mapClick(event)
        })
        // 中心位置移动
        qq.maps.event.addListener(map,'center_changed',function (e) {
          getCenter()
        })
        // 鼠标down
        qq.maps.event.addListener(map,'mousedown',function (event){
          console.log(76,'down',event)
        })
        // 鼠标move
        qq.maps.event.addListener(map,'mousemove',function (event){
          // console.log(77,event)
        })


      })
    }
    const mapClick = (e)=>{
      console.log(59,e,mapQQ.value, mapQQ.value.Marker)
      let {lat , lng} = e.latLng
      let map = mapObj.value 
      let position = new mapQQ.value.LatLng(lat,lng) 
      console.log(113,position)
      let marker = new mapQQ.value.Marker({
          position ,
          map ,
          draggable : drag.value
        })

      mapQQ.value.event.addListener(marker,'click',function () {
        console.log('marker click')
      })  
      if(radio.value){
        markerList.value.length && markerList.value.map(item=>{
          item.marker.setMap(null)
        })
        markerList.value=[]
        markerList.value.push({lat , lng , marker})
        console.log('dan')
      }else {
        markerList.value.push({lat , lng , marker})
        if(markerList.value.length > 10) {
          let {marker} = markerList.value.shift()
          marker.setMap(null)
        }
      }

    }
    const changeMapCenter = (e) =>{
      console.log(78,e)
    }
    const getCenter = ()=>{
      // console.log(81,mapObj.value.getCenter())
      let {
        lat , lng 
      } =  mapObj.value.getCenter()
      moveInfo.value = {
        lat :lat.toFixed(3), 
        lng : lng.toFixed(3)
      }
    }

    

    return{
      drag ,
      radio ,
      road ,
      mapType,
      mapTypes,
      center ,
      mapObj ,
      getCenter ,
      moveInfo ,
      markerList ,
      mapQQ
      // mapInit
    }
  },
})
</script>
<style lang="scss" scoped>
#map{
  width:1000px;
  height: 600px;
}
</style>
