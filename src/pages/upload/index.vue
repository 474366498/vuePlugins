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
        <div class="editor-box" id="editor" contenteditable="true" style="width:600px;height:200px;border:1px solid pink;overflow-y:auto;text-align:left;" >
          可以直接粘贴图片到这里直接上传
        </div>
        <br/><br/>
        <button type="button" id="btn-submit" @click="e=>upload01(e)">普通上传</button><br/><br/>
        <button type="button" @click="e=>upload02(e)" :disabled="prevBoolean">有进度状态的上传</button> <br/><br/>
        <button type="button" id="btn-submit"  @click="e=>upload03(e)">上 传 并 预 览</button>
    </div>
    <br/><br/>
        
    <div class="img-box" v-if="prevBoolean && prevList.length">
      <div class="img" v-for="item in prevList" :key="item.blob">
        <img :src="item.blob" />
      </div>
    </div>
    <NSwitch v-model:value="prevBoolean" /> 
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
    document.addEventListener('drop',function (e){
      e.preventDefault()
    })
    openDropEvent()
    function openDropEvent(){
      let el  = document.querySelector('.drop-box') as HTMLDivElement
      el.addEventListener('dragover',function (e) {
        el.classList.add('over')
        e.preventDefault()
      })
      el.addEventListener('dragleave',function (e) {
        el.classList.remove('over')
        e.preventDefault()
      })
      el.addEventListener('drop',function (e:Event){
        e.preventDefault()
        var fileList = e.dataTransfer.files  
        var len = fileList.length
        if(!len){
          el.classList.remove('over')
          return
        }
        el.classList.add('over')
        console.log(62,fileList)
        setTimeout(() => {
           var fd = new FormData()
          fd.append('title','file')
          for(let i = 0 ; i < fileList.length ; i++) {
            fd.append('file',fileList[i])
          }
          console.log(35,fd)
          var xhr = new XMLHttpRequest()
          xhr.open('POST', 'http://192.168.2.100:8000/upload',true)
          xhr.onreadystatechange = function (){
            if(xhr.readyState === 4 && this.status === 200){
              console.log(39,xhr)
            }
          }
          xhr.send(fd)
        }, 5000);
      },false)
    }

    const editor = document.querySelector('#editor') as HTMLDivElement
    editor.addEventListener('paste',function (event:Event) {
      console.log('pas',event,window)
      var data = event.clipboardData || window.clipboardData
      console.log(data)
      var items = data.items 
      var fileList = [] 
      if(items && items.length) {
        for(let i = 0 ; i < items.length ; i++) {
          fileList.push(items[i].getAsFile())
        }
      }
      console.log(104,fileList)
      if(fileList.length > 0) {
        event.preventDefault()
        // node upload-demo
        submitUpload(fileList,editor)
      }

    })
  },
  setup (prop,context) {
    console.log(22,prop,context)
    let prevBoolean = ref(true)  // 预览开关
    let fileList = ref([])    // 上传列表
    let prevList = ref([])    // 预览列表
    let api = 'http://192.168.2.100:8000/upload'  // server app server01

    const onChangeFile = (e:Event)=>{
      let el = e.target as HTMLInputElement
      let files = el.files 
      console.log(fileList.value)
      fileList.value= fileList.value.concat(Array.prototype.slice.call(files))
    }
    watch(fileList,(newFiles,oldFiles)=>{
      console.log(prevBoolean)
      if(prevBoolean.value && newFiles.length){
        console.log(42,newFiles)
        for(let i = 0 ; i < newFiles.length;i++){
          let file = newFiles[i]
          let img = document.createElement('img')
          img.src = window.URL.createObjectURL(file)
          img.onload = function () {
            window.URL.revokeObjectURL(file)
          }
          console.log(50,img.src)
          let prevItem : prevFace = {
            file,
            blob : img.src ,
            process : 0
          }
          prevList.value.push(prevItem)
        }
          console.log(prevList,prevList.value)

        // prevList
      }
    })
    // node upload-demo
    const upload01 = (e:Event)=>{
      console.log(24,e)
      console.log(fileList.value)

      if(!fileList.value || fileList.value.length < 1) return false
      var fd = new FormData()
      fd.append('title','file')
      fd.append('cname','普通上传')
      for(let i = 0 ; i < fileList.value.length ; i++) {
        fd.append('file_'+(i+1),fileList.value[i])
      }
      console.log(35,fd)
      var xhr = new XMLHttpRequest()
      xhr.open('POST',api,true)
      xhr.onreadystatechange = function (){
        if(xhr.readyState === 4 && this.status === 200){
          console.log(39,xhr)
        }
      }
      xhr.send(fd)
    }
    // node upload-progress
    const upload02 = (e:Event) => {
      if(prevBoolean.value) return false
      if(!fileList.value || fileList.value.length < 1) return false 
      var fd = new FormData()
      fd.append('title','进度文件')
      fd.append('cname','进度上传')
      for(let i = 0 ; i < fileList.value.length;i++) {
        fd.append('file',fileList.value[i])
      }
      var xhr = new XMLHttpRequest()
      xhr.open('POST',api,true)
      xhr.onreadystatechange = function (){
        if(xhr.readyState === 4 && this.status === 200) {
          console.log(xhr)
        }
      }
      xhr.onprogress=updateProgress
      // xhr.upload.onprogress = updateProgress
      function updateProgress (event:any){
        console.log(56,event)
        if(event.lengthComputable){
          var completedPercent = (event.loaded / event.total * 100).toFixed(2)
          console.log('进度', completedPercent)
        }
      }
      xhr.send(fd)
    }
    // node upload-prew
    const upload03 = (e:Event) => {
      console.log(85,prevList,prevList.value.length)
      if(!prevList.value.length){
        return 
      }else{
        xhrSend(prevList.value)
      }
    }
    function xhrSend (fileList){ 
      console.log(209,fileList)
      var abortFn = function () {
        if(xhr && xhr.readyState !== 4) {
          xhr.abort()
        }
      }
      var fd = new FormData()
      fd.append('title','可以预览文件')
      fd.append('cname','预览上传')
      fileList.forEach(item => {
        console.log(219,item)
        fd.append('file',item.file)
      });
      var xhr = new XMLHttpRequest()
      xhr.open('POST',api,true)

      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.uploaded) {
          var obj = JSON.parse(xhr.responseText)
          console.log(obj)
        }
      }

      xhr.onprogress = uplaodProgress
      // xhr.upload.onprogress = uplaodProgress

      function uplaodProgress (event:Event){
        if(event.lengthComputable){
          var completedPercent = (event.loaded / event.total * 100).toFixed(2);
          if(completedPercent >= 100){
            console.log('已上传',completedPercent); 
            prevList.value = []
          }
        }
      }
      xhr.send(fd)
      return xhr

    }
    return {
      prevBoolean , 
      prevList ,
      onChangeFile ,
      upload01 ,
      upload02 ,
      upload03
    }
  }
})

var submitUpload = function (files:[] , editor , api='http://192.168.2.100:8000/upload') {
  console.log(files)
  var formData = new FormData()
  files.forEach(file=>{
    formData.append('file',file)
  })
  var xhr = new XMLHttpRequest()
  xhr.open('POST',api,true)
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4){
      console.log(261,xhr.responseText)
      let res = JSON.parse(xhr.responseText)
      if(res.data && res.data.length){
        let files = res.data
        console.log(files)
        let img = document.createElement('img')
        img.src = files[0].src 
        img.style.width = '100px'
        insertNodeToEditor(editor,img)
      }
    }
  }
  xhr.send(formData)
}

function insertNodeToEditor(editor:HTMLDivElement ,img:HTMLImageElement) {
  var range 
  var node = window.getSelection()?.anchorNode
  if(node !=null) {
    range = window.getSelection()?.getRangeAt(0)
    range?.insertNode(img) 
  }else{
    editor.append(img)
  }
}
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