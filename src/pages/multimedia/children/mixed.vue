<template>
  <section>
    <!-- <p>{{index}}</p>
    <p>{{src}}</p>
    <p>??{{type}}</p>
    <p>{{/^audio/.test(type) ? 'audio' : 'video'}}</p>
    <p>{{playLoc}}</p> -->
    <!-- <div v-for="(item ,_index) in data" :key="_index">
      {{_index}}
      <template v-if="_index===index">
      <audio v-if='/^audio/.test(item)' controls autoplay>
        <source :src='item' :type='type' />
      </audio>
      <video v-else controls autoplay>
        <source :src='item' :type='type' />
      </video>
      </template>
    </div>  -->
    <audio id='audio' ref='mediaRef' v-if='/^audio/.test(type)' controls autoplay 
      @timeupdate="e=>onMediaPlaying(e)"
      @seeked="e=>onMediaSeeked(e)"
      @pause="e=>onMediaPause(e)"
    >
     <source :src='src' :type='type' />
    </audio>
    <video id='video' ref='mediaRef' v-else controls autoplay 
      @timeupdate="e=>onMediaPlaying(e)"
      @seeked="e=>onMediaSeeked(e)"
      @pause="e=>onMediaPause(e)"
    >
      <source :src='src' :type='type' />
    </video>
  </section>
</template>

<script lang="ts">
// import Vue , {defineComponent} from 'vue'
import {defineComponent , ref , computed ,onMounted ,watch , watchEffect, reactive , toRefs} from 'vue'
import video from './video.vue'
export default defineComponent({
  components: { video },
  name : 'media-mixed' ,
  cname : '多媒体-混入式' ,
  props : {
    data : {
      type : Array ,
      default :[]
    },
    index : {
      type : Number
    },
    warnLoc : {
      type : Number
    },
    warnFn : {
      type : Function 
    }
  },
  setup (props,context) {
    console.log(props,context)
    let { data , index , warnLoc , warnFn } = toRefs(props) 
    console.log(29, data , index , warnLoc , warnFn)
    let mediaRef = ref(null)  // 媒体 dom 节点
    let playLoc = ref(0)      // 媒体播放进度(秒)
    watch(index,(newV,oldV)=>{
      let newSuffix = data.value[newV].match(/([^\.]{1,})$/gi)[0]
      let oldSuffix = data.value[oldV].match(/([^\.]{1,})$/gi)[0]
      console.log(39,newV , newSuffix ,oldV , oldSuffix,type)
      if(newSuffix === oldSuffix){  // 这里只判断了文件名后缀 应该判断文件所用的播放器类型 是audio 还是 video 
        playNext()
      }
    })
    watch(playLoc,(newV,oldV)=>{
      if(Math.abs(newV - oldV) > 3) {
        context.emit('seeked',newV - oldV)
      }      
    })
    onMounted(()=>{
      console.log('mounted',mediaRef)
    })
    const src = computed(()=>{
      return data.value[index.value]
    })
    const type = computed(()=>{
      let suffix = data.value[index.value].match(/([^\.]{1,})$/gi)[0]
      console.log(suffix)
      switch (suffix) {
        case 'mp3':
          return 'audio/mpeg'
        case 'ogg':
          return 'audio/ogg'
        case 'wav':
          return 'audio/wav'
        case 'mp4':
          return 'video/mp4'
        case 'webm':
          return 'video/webm'
        default:
          return 'video/ogg'
      }
    })
    // 同类型 下一步播放
    const playNext = () => {
      let elType = type.value 
      console.log(elType , /^audio/.test(elType))
      let el:HTMLAudioElement|HTMLVideoElement = document.getElementById(/^audio/.test(elType) ? 'audio' : 'video')
      // let 
      console.log(79,el , mediaRef.value ,src.value)
      el.src = src.value
      el.play()
    }
    // 媒体播放中...
    const onMediaPlaying = e =>{
      playLoc.value = e.target.currentTime
      let { currentTime , duration } = e.target 
      if(warnFn.value && typeof warnFn.value == 'function'){
        if(duration - currentTime < warnLoc.value) {
          warnFn.value()
        } 
      }
      // warnLoc  warnFn
      // console.log(94,e)
    }
    const onMediaSeeked = e =>{
      console.log('seeked',e)
    }
    const onMediaPause = e => {
      let {currentTime , duration} = e.target 
      context.emit('pause',e.target)
      console.log(currentTime === duration ? '停止' : '暂停')
    }
    return {
      mediaRef,
      index ,
      src  ,
      type ,
      playLoc , 
      onMediaPlaying ,
      onMediaSeeked ,
      onMediaPause
    }
  }
})
</script>