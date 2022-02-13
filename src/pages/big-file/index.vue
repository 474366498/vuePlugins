<template>
  <section>
    <h1><a href='https://juejin.cn/post/6844903968338870285#heading-19' target='_blank' >来源</a></h1>
    <div >
        选择文件(可多选):
        <input type="file" id="f1" @change="e=>onChangeFile(e)" multiple/><br/><br/>
        <div ref="drop" class="drop-box" style="width:600px;height:200px;border:1px solid red;">
            拖拽文件到页面的操作 <br/>
            拖拽文件到页面的操作 <br/>
            拖拽文件到页面的操作 <br/>
            拖拽文件到页面的操作 <br/>
            拖拽文件到页面的操作 <br/>

        </div>
        <br/><br/>
        <button type="button" id="btn-submit" @click="e=>uploadFn(e)">上传</button><br/><br/>
        <code>上传过后 再上传后台(node)报错  搞不懂...</code>
    </div>
  </section>
</template>

<script lang="ts">
interface prevFace{
  file : File ,
  blob : String ,
  process : Number
}
import Vue  , { defineComponent , ref , watch} from 'vue'
export default defineComponent({
  name : 'upload' ,
  data () {
    return {

    }
  },
  mounted () {
    document.addEventListener('drop',function (e) {
      e.preventDefault()
    })
    dropFile()
    function dropFile () {
      var el = document.querySelector('.drop-box') as HTMLDivElement
      el.addEventListener('dragover',function (e) {
        el.classList.add('over')
        e.preventDefault()
      })
      el.addEventListener('dragleave',function (e) {
        el.classList.remove('over')
        e.preventDefault()
      })
      el.addEventListener('drop',function (e:Event) {
        let files = e.dataTransfer.files
        console.log(50,files)
      })
    }
  },
  setup (prop,context) {
    console.log(22,prop,context)
    var chunkSize = 2 * 1024 * 1024 
    // var chunkSize = 2 * 100 * 1024 

    let fileList = ref([])    // 上传列表
    let api = 'http://192.168.2.100:8000/bigUpload'  // server app server01

    const onChangeFile = (e:Event)=>{
      let el = e.target as HTMLInputElement
      let files = el.files 
      console.log(fileList.value)
      fileList.value= fileList.value.concat(Array.prototype.slice.call(files))
    }
   // node upload-big
    const uploadFn = (e:Event)=>{
      console.log(73,fileList)
      if(!fileList.value.length) return false 
      let file:File = fileList.value[0]
      var chunks = [] ,
      token : Number = (+ new Date()),
      name = file.name ,
      chunkCount : Number = 0 ,
      sendChunkCount : Number = 0 ;

      if(file.size > chunkSize){
        console.log('切')
        let start = 0 , end = 0 ;
        while(true) {
          end += chunkSize
          var blob = file.slice(start,end)
          start += chunkSize
          if(!blob.size){
            break
          }
          chunks.push(blob)
        }
      }else {
        console.log('过')
        chunks.push(file.slice(0))
      }
      console.log(75,chunks)
      chunkCount = chunks.length

      for(let i = 0 ; i < chunkCount ; i++){
        var fd = new FormData()
        fd.append('f1',chunks[i])
        fd.append('token',token)
        fd.append('index',i)
        xhrSend(fd,function () {
          sendChunkCount += 1
          if(sendChunkCount === chunkCount) {
            console.log('上传完成，发送合并请求')
            var formD = new FormData()
            formD.append('type','merge')
            formD.append('token',token)
            formD.append('chunkcount',chunkCount)
            formD.append('filename',name)
            xhrSend(formD)
          }
        })
      }
    }
    function xhrSend (fd:FormData,cb:Function) {
      console.log(97,fd)
      var xhr = new XMLHttpRequest()
      xhr.open('POST',api,true)
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
          cb && cb()
        }
      }
      xhr.send(fd)
    }
    return {
      onChangeFile ,
      uploadFn 
    }
  }
})

</script>

<style lang="scss" scoped>
.img-box{
  position:fixed;
  left:10px;
  top:50px;
  max-width: 160px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  .img , img{
    width:120px;
    height: 120px;
  }
}
</style>