<template>
  <section class="flex flex-jc-c">
    <em>{{playLoc}}</em>
    <audio id='audio' ref="audio" controls autoplay >
      <source :src="src" :type="sourceType" />
    </audio>
  </section>
</template>

<script lang="ts">
import Vue , {defineComponent , ref , computed ,onMounted ,watch} from 'vue'
export default defineComponent ({
  name : 'media-music' ,
  cname : '多媒体-音乐' ,
  props: {
    src : {
      type : String || Array ,
      default : []
    },
    warnLoc : {
      type : Number ,
      default : 0
    },
    warnFn : {
      type : Function 
    }
  },
  setup (props,context) {
    let {src , warnLoc ,warnFn } = props
    console.log(15,props)
    let playLoc = ref(0)
    let playTol = ref(0)
    watch(playLoc,(newV,oldV)=>{
      // console.log(newV,oldV)
      if(Math.abs(newV-oldV) > 2) {
        context.emit('seeked',newV-oldV)
      }
    })
    const sourceType = computed(()=>{
      let srcSplit = src.match(/\.([a-z0-9]{1,})$/gi)
      let type = srcSplit[0].toLowerCase()
      console.log(42,type)
      switch (type) {
        case '.mp3':
          return 'audio/mpeg'
        case '.ogg':
          return 'audio/ogg'
        default:
          return 'audio/wav'
      }
    })

    onMounted(()=>{
      const audio:HTMLAudioElement = document.getElementById('audio')
      console.log(24,audio)
      audio.addEventListener('durationchange',function (e){
        playTol.value = e.target?.duration
        console.log(28,e)
      })
      audio.addEventListener('pause',function (e) {
        context.emit('pause',e.target)
        // console.log(31,'暂停或完成了',e)
      })
      audio.addEventListener('seeked',function (e) {
        console.log(34,'快进/快退',e )
      })
      audio.addEventListener('timeupdate',function (e){
        let {currentTime , duration} = e.target
        // console.log(52,currentTime , duration , duration - currentTime , warnLoc)
        playLoc.value = currentTime || 0
        if(!warnLoc) return false
        if((duration - currentTime < warnLoc)&&warnFn){
          warnFn()
        }
      })
    })
    return {
      src ,
      sourceType ,
      playLoc
    }
  }
})
</script>