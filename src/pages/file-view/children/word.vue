<template>
  <section class="word">
    word
    <div v-if="!!wordStr" class="word-str" v-html="wordStr" ></div>
  </section>
</template>

<script lang="ts">
// import { arrayBuffer } from 'stream/consumers'
import Vue , {defineComponent, onMounted , ref} from 'vue'
// import mammoth from 'mammoth'
export default defineComponent({
  name : 'word-view' ,
  cname : 'word预览' ,
  props : {
    path : String
  },
  setup (props,context) {
    console.log('13',props)
    let wordStr = ref('')
    onMounted(()=>{
      console.log('来了',props.path)
      if(props.path) {
         resolveWord(props.path)
      }
    }) 

    const resolveWord = (path) => {
      let url = `http://127.0.0.1:3000/`+path
      if(/.doc$/g.test(path)){
        console.log('doc')
        return false
      }
      console.log(10,mammoth)
      console.log(22,url)
      fetch(url,{
        method : 'GET' ,
        responseType : 'arraybuffer'
      }).then(res=>{
        // console.log(34,res,res.arrayBuffer())
        return res.arrayBuffer()
        
      }).then(arrayBuffer => {
        console.log(39,arrayBuffer)
        mammoth.convertToHtml({arrayBuffer }).then(result => {
          console.log(41,result)
          wordStr.value = result.value
        })
      })
      // const res = await mammoth.convertToHtml({arrayBuffer:response.body})
    }
    return {
      wordStr
    }
  }
})
</script>


