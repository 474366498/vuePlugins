<template>
  <section class="flex flex-dir-c">
    <div class="flex">
      <p>{{mediaInfo}}</p>
      <el-radio-group v-model="mediaInfo.type">
        <el-radio label='music' value="music">music</el-radio>
        <el-radio label='video' value="video">video</el-radio>
        <el-radio label='mixed' value="mixed">mixed</el-radio>
      </el-radio-group>
      <br />
      <el-switch v-model="mixedAuto" active-text="自动" inactive-text="手动" />
    </div>
    <!-- <font>{{mediaSrc}}</font> -->
    <p><code>{{mixedInfo}}</code></p>
    <MediaMusic 
      v-if="mediaInfo.type =='music'" 
      :src="mediaSrc" 
      :warnLoc='4'
      :warnFn="onMusicWarnFn"
      @seeked="e=>onMusicSeeked(e)"
      @pause="e=>onMusicPause(e)"  
    />
    <MediaVideo 
      v-else-if="mediaInfo.type =='video'" 
      :src="mediaSrc" 
      :warnLoc='4'
      :warnFn="onVideoWarnFn"
      @seeked="e=>onVideoSeeked(e)"
      @pause="e=>onVideoPause(e)"
    />
    
    <MediaMixed 
      v-else
      :data="mediaSrc || mixedInfo.data"
      :index="mixedInfo.index"
      :warnLoc="10"
      :warnFn = 'onMediaWarnFn'
      @seeked="e=>onMediaSeeked(e)"
      @pause="e=>onMediaPause(e)"
    >
      mixed 混合模式
    </MediaMixed>
    <button @click="e=>autoChangeMixed()">++{{mixedInfo.index}}++</button>
  </section>
</template>
<script lang="ts">
import {defineComponent ,ref , reactive , computed } from 'vue'
import MediaMusic from './children/music.vue'
import MediaVideo from './children/video.vue'
import MediaMixed from './children/mixed.vue'
import { Console } from 'console'

export default defineComponent({
  name : 'multimedia' ,
  cname : '多媒体播放器',
  components : {
    MediaMusic ,
    MediaVideo ,
    MediaMixed
  },
  setup () {
    console.log('home setup')
    // http://m701.music.126.net/20220411102221/981d524965a436f6142b8b56a623ee19/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/10785831075/5159/e631/6454/4079b5e2fd8f2b22811a2a2d794d3c45.mp3
    let mediaInfo = reactive({  // 多媒体来源地址  https://blog.csdn.net/qq_41737172/article/details/107039305
      type : 'mixed' ,
      music : 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3' ,
      video : 'https://media.w3.org/2010/05/sintel/trailer.mp4'
    })
    let mixedInfo = reactive(
      { index : 0 , 
        data:[
          'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3' ,
          'https://media.w3.org/2010/05/sintel/trailer.mp4' ,
          'https://media.w3.org/2010/05/sintel/trailer.mp4',
          'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          'http://vjs.zencdn.net/v/oceans.mp4'
        ]
      }
    )
    let mixedAuto = ref(true)
    let mediaSrc = computed(()=>mediaInfo[mediaInfo.type] || mixedInfo.data)
    const onMusicSeeked = (val) =>{
      console.log(val > 0 ? '快进' : '快退',Math.abs(val).toFixed(2))
    }
    const onMusicPause = target =>{
      let {currentTime , duration} = target
      console.log(currentTime === duration  ? '停止' : '暂停',target)
    }
    const onVideoSeeked  =val =>{
      console.log(val > 0 ? '快进' : '快退',Math.abs(val).toFixed(2))
    }
    const onVideoPause =target =>{
      let {currentTime , duration} = target
      console.log(currentTime === duration  ? '停止' : '暂停',target)
    }

    const autoChangeMixed = () => {
      console.log('auto', mediaInfo.type)
      if(mediaInfo.type !== 'mixed') return 
      if(mixedInfo.index < mixedInfo.data.length - 1) {
        mixedInfo.index ++
      }else{
        mixedInfo.index = 0
      }
      console.log(mixedInfo)
    }

    const onMediaSeeked = val =>{
      console.log(val > 0 ? '快进' : '快退',Math.abs(val).toFixed(2))
    }
    const onMediaPause = target => {
      let {currentTime , duration} = target
        console.log(currentTime === duration  ? '停止' : '暂停',target)
      if(currentTime === duration && mixedAuto.value) {
        if(mixedInfo.index < mixedInfo.data.length - 1) {
          mixedInfo.index ++
        }else{
          mixedInfo.index = 0
        }
      }
    }
    return {
      mediaInfo ,
      mediaSrc ,
      onMusicSeeked ,
      onMusicPause ,
      onMusicWarnFn : function (e){
        console.log('music 广告时间来了')
      },
      onVideoSeeked ,
      onVideoPause ,
      onVideoWarnFn : function (e) {
        console.log('video 广告时间来了')
      },
      // 混入式 start 
      mixedInfo,
      mixedAuto , 
      autoChangeMixed ,
      onMediaSeeked ,
      onMediaPause ,
      onMediaWarnFn : function () {
        console.log('mixed 广告时间')
      }
      
    }
  }
})
</script>