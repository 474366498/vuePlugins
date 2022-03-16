<template>
  <section class="ppt">
    ppt
    <div id="ppt"></div>
  </section>
</template>

<script lang="ts">
import Vue , {defineComponent, onMounted} from 'vue'
export default defineComponent({
  name : 'ppt-view' ,
  cname : 'ppt-预览',
  props:{
    path:{
      type : String ,
      default : ''
    }
  },
  setup (props) {
    onMounted (()=>{
      console.log(21,props.path,$,$("#ppt"))
      let url = `http://127.0.0.1:3000/`+props.path
       $("#ppt").pptxToHtml({ 
        pptxFileUrl: url, 
        slidesScale: "50%", 
        slideMode: false, 
        keyBoardShortCut: false 
      })
    })
  }
})
</script>