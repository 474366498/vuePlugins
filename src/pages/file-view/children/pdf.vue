<template>
  <section class="pdf">
    <div class="flex flex-jc-sa">
      <span @click="e=>onChangeViewPage(false)">prev</span>
      <span>{{page}}</span>
      <span @click="e=>onChangeViewPage(true)">next</span>
      <span @click="e=>onPrintPdf()">print</span>
    </div>
    <div id="pdf-el">
      <template v-for="item in pages" :key="item">
        <canvas v-if="item === page" :id="`pdf-${item}`" ></canvas>
      </template>
    </div>
    <!-- <iframe id="print-iframe" :src="'http://127.0.0.1:3000/'+path" style="display:none"></iframe> -->
  </section>
</template>
<script lang="ts">
import Vue , {defineComponent  , onMounted, reactive, ref, toRefs, watch } from 'vue'
import * as PDF from 'pdfjs-dist'
PDF.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
export default defineComponent({
  name : 'pdf-view' ,
  cname : 'pdf-预览',
  props:{
    path:{
      type : String ,
      default : ''
    }
  },
  setup (props,context) {
    console.log(14,props,context)
    let pdfInfo = reactive({
      pages : 0 ,
      page:1,
      pdfCtx : null
    })
    let pdfObj:Object = ref({})
    onMounted(()=>{
      console.log('来了',props.path)
      if(props.path) {
         resolvePdf(props.path)
         createPrintIframe(props.path)
      }
    }) 
    // watchEffect(()=>{
    //   console.log(props.path)
    //   if(props.path) {
    //     resolvePdf(props.path)
    //   }
    // })
    
    let resolvePdf = path => {
      let url = `http://127.0.0.1:3000/`+path
      const loadingTask = PDF.getDocument(url)
      loadingTask.promise.then(pdf => {
        pdfInfo.pdfCtx = pdf
        pdfObj = pdf
        pdfInfo.pages = pdf.numPages
        pdf.getPage(pdfInfo.page).then(P=>{
          console.log(47,P)
          const canvas = document.getElementById(`pdf-1`)
          const ctx = canvas.getContext('2d')
          const viewport = P.getViewport({scale:4})
          canvas.height = viewport.height
          canvas.width = viewport.width
          // 画布的dom大小, 设置移动端,宽度设置铺满整个屏幕
          const clientWidth = document.body.clientWidth
          canvas.style.width = clientWidth + 'px'
          // 根据pdf每页的宽高比例设置canvas的高度
          canvas.style.height = clientWidth * (viewport.height / viewport.width) + 'px'
          P.render({
            canvasContext: ctx,
            viewport
          }) 
        })
      })
    }

    const onChangeViewPage =  (bool:Boolean) => {
       bool ? (pdfInfo.page < pdfInfo.pages ? pdfInfo.page++ : pdfInfo.pages) : (pdfInfo.page > 1 ? pdfInfo.page-- : 1)
      console.log(bool,pdfInfo)
    }
    watch(()=>pdfInfo.page,(newV,oldV)=>{
      console.log(82,newV,oldV)
      if(newV !== oldV ){
        renderPdf(newV)
      }
    })
    let renderPdf = (num =1) => {
      console.log(58,pdfInfo.pdfCtx , pdfObj)
      pdfObj && pdfObj.getPage(num).then(P => {
        console.log(P)
        const canvas = document.getElementById(`pdf-${num}`)
        const ctx = canvas.getContext('2d')
        const viewport = P.getViewport({scale:1})
        canvas.height = viewport.height
        canvas.width = viewport.width
        // 画布的dom大小, 设置移动端,宽度设置铺满整个屏幕
        const clientWidth = document.body.clientWidth
        canvas.style.width = clientWidth + 'px'
        // 根据pdf每页的宽高比例设置canvas的高度
        canvas.style.height = clientWidth * (viewport.height / viewport.width) + 'px'
        P.render({
          canvasContext: ctx,
          viewport
        })
        // if (num < pdfInfo.pages) {
        //   renderPdf(num + 1)
        // } else {
        //   // emit('onRendered')
        // }
      })
    } 
    const createPrintIframe = path => {
      let url = `http://127.0.0.1:3000/`+path
      let iframe:HTMLIFrameElement = document.createElement('iframe')
      iframe.setAttribute('id','print-iframe')
      iframe.setAttribute('src',url)
      iframe.style.opacity = '0'
      document.body.appendChild(iframe)
    }
    const onPrintPdf = () =>  {
      let pi:HTMLIFrameElement = document.getElementById('print-iframe')
      pi.contentWindow?.focus()
      pi.contentWindow?.print()
      // let url = `http://127.0.0.1:3000/`+path
      // fetch(url,{
      //   method:'GET',
      //   responseType:'arraybuffer'
      // }).then(res=>res.blob())
      //   .then(data => {
      //     console.log(data)
      //     let url = window.URL.createObjectURL(data)
      //     let printIframe:HTMLIFrameElement = document.createElement('iframe')
      //     printIframe.setAttribute('id','printIfram')
      //     printIframe.setAttribute('src',url)
      //     document.body.appendChild(printIframe)

      //     printIframe.contentWindow.print()
      //   })
    }
    return {
      ...toRefs(pdfInfo) ,
      onChangeViewPage ,
      onPrintPdf
    }
  }
})
</script>

<style lang="scss" scoped>
  .flex{
    display: flex;

  }
  .flex-jc-sb{
    justify-content: space-between;
  }
  .flex-jc-sa{
    justify-content: space-around;
  }
</style>

