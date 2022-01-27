<template>
<section class="default-test-page">
  <SelectUserSearch />
  <FormUserRules />
  <RenderChild @change="e => onChildInputChange(e)" :childObj="obj" />
  <RichTextEditor />
  <br/><br/><br/><br/><br/><br/>
  127386187236
  <!-- <TdWangEditor v-model="wangValue" :readonly="wangDisabled"  :userUploadImg="(files,insertFn)=>wangUploadImg(files,insertFn)"  :userUploadVideo="(f,fn) => wangUploadVideo(f,fn)"/>
  <el-switch active-text="仅可读" inactive-text="可编辑" v-model="wangDisabled"></el-switch> -->
</section>

</template>

<script type="text/javascript">
// import { uploadFile } from '@/api/index.js'
import { 
      SelectUserSearch ,
      FormUserRules ,
      RenderChild , 
      RichTextEditor 
    } from './children/index.js'

console.log(19,import.meta)
export default {
  data() {
    return {
      obj: {
        num: 123,
        flg: false,
        switchObj: {
          value: false,
          activeText: 'ON',
          inactiveText: 'OFF'
        }
      },
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      //  baseURL:   process.env.VUE_APP_BASE_API , 
      baseURL: import.meta.env.VUE_APP_BASE_API ||  'http://192.168.2.13:8887',
      wangDisabled : false,
      wangValue : '<p>aef af</p><p><br/></p><p><br/></p><p><iframe src="http://192.168.2.10:8887/file/127/838cec759a23432a900fc3a68aa1c669.mp4" style="width:650px;height: 366px" frameborder="0"></iframe><img src="http://192.168.2.10:8887/file/127/07f3a58dd19e4910a6c09ad7daabfab1.jpg" contenteditable="false" style="max-width: 100%;"/></p><br/>'
    }
  },
  components: {
    SelectUserSearch ,
    FormUserRules ,
    RenderChild ,
    RichTextEditor
  },
  beforeCreate() {
    // this.$nextTick(() => {
    //   console.log(50, 'nextTick', document)
    // })
  },

  methods: {

    onChildInputChange(e) {
      let { type, value } = e
      console.log(467, e)
      this.obj[type] = value
    },
    wangUploadImg (files,insertFn) {
      console.log(50,files,insertFn)
      let {baseURL, userId, Authorization} = this
      let formData = new FormData()
      if(files.length > 0) {
        for(let i = 0 ; i < files.length ;i++) {
          formData.append('file',files[i])
        }
      }
      formData.append('userId',userId)
      formData.append('busType','text_editor')
      formData.append('Authorization',Authorization)
      uploadFile
              .batchUpload(formData).then(res=>{
                console.log(39,res)
                if(res.code === '0000') {
                  if(Array.isArray(res.data)) {
                    res.data.map(item=>{
                      insertFn(baseURL+item.url)
                    })
                  }else{
                    insertFn(baseURL+res.data.url)
                  }
                }
              }).catch(err=>{
                console.log(41,err)
              })
    },
    wangUploadVideo (files,insertFn) {
      console.log(83,files,insertFn)
      let {baseURL, userId, Authorization} = this
      let formData = new FormData()
      if(files.length > 0) {
        for(let i = 0 ; i < files.length ;i++) {
          formData.append('file',files[i])
        }
      }
      formData.append('userId',userId)
      formData.append('busType','text_editor')
      formData.append('Authorization',Authorization)
      uploadFile
              .batchUpload(formData).then(res=>{
                console.log(96,res)
                if(res.code === '0000') {
                  if(Array.isArray(res.data)) {
                    res.data.map(item=>{
                      insertFn(baseURL+item.url)
                    })
                  }else{
                    insertFn(baseURL+res.data.url)
                  }
                }
              }).catch(err=>{
                console.log(107,err)
              })
    }
  }
}
</script>

<style lang="scss" scoped>
.default-test-page{
  padding:20px;
  height: 100%;
  overflow-y: auto;
}
h4{
  margin:10px 0;
}

</style>
