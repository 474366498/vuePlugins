<template>
  <section class="web-worker">
    web-worker
    <code>
      <p>Physijs - Web Worker 跨域访问 https://blog.csdn.net/qq_43758883/article/details/104169108</p>
      <p>Web Workers 资源跨域问题 https://zhuanlan.zhihu.com/p/47878150</p>
    </code>
  </section>
</template>
<script lang="ts"> 
import Vue ,{defineComponent , ref , onMounted , onBeforeMount } from 'vue'
export default defineComponent({
  setup (props,context){
    onBeforeMount (()=>{
      console.log('bm')
      let blob = new Blob(["http://192.168.2.100:8000/js"],{
        "type" : 'application/javascript'
      })
      let blobUrl = window.URL.createObjectURL(blob)
      console.log(19,blob , blobUrl )
      fetch('http://192.168.2.100:8000/js').then(res=>{
        console.log('fetch',res)
        return res.json()
      }).then(res => {
        console.log(24,res.data)
        // res.data 有时会把空格 删除了  就报错了
        const worker = new Worker(`data:application/javascript,${encodeURIComponent(res.data)}`)
        worker.onerror = function () {
          console.log('worker blob error')
        }
      })
    })
    onMounted (()=> {
      console.log('m')
      const codeWrapperFun = () => {
        console.log('12 3' + '\n' + '45 6');
      };
      const codeString = codeWrapperFun.toString().slice(7, -1);
      const worker = new Worker(`data:application/javascript, ${codeString}`)
      console.log(worker)
      worker.onmessage = function (event) {
        console.log('message')
      }
      worker.onerror = function (params) {
        console.log(18,'worker toString data:application/javascript error')
      }

      var work = new Worker('worker.js')
      work.postMessage('work com')
      work.onmessage = function (e) {
        console.log(51,e)
      }
    })

  }
})
</script>