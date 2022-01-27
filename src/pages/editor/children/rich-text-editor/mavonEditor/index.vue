<template>
  <section style="width:1000px" class="flex flex-dir-c">
    <code>
      mavon-editor 现在不支持 v3 + vite <br/>
      v-md-editor 倒是支持 当前 电脑 的node又不支持(node-sass sass) 无法编译....
    </code>
     <!-- <v-md-editor v-model="mavonValue" height="400px"></v-md-editor> -->
    <!-- <mavon-editor  v-model="mavonValue" :defaultOpen="'preview'" :subfield="mavonSubfield" :editable="mavonEditable" :isHljs ="true" @imgAdd="imgAdd" ref=md></mavon-editor> -->
     <!-- <el-input
      type="textarea"
      disabled
      :autosize="{ minRows: 4, maxRows: 8 }"
      v-model="mavonValue"
    />
    <div class="flex flex">
      <el-switch active-text="双栏" inactive-text="纯预览" v-model="mavonSubfield"></el-switch>
      <span style="padding:10px;"></span>
      <el-switch active-text="编辑" inactive-text="纯查看" v-model="mavonEditable"></el-switch>
    </div> -->
  </section>
</template>

<script>
// import { uploadFile } from '@/api/index.js'
export default {
  name : 'mavon-user-editor' ,
  cname : 'mavon-deitor 自定义 编辑器' ,
  data () {
    return {
        // mavonSubfield : true ,
        // mavonEditable : true ,
        // userId: localStorage.getItem('userId'),
        // Authorization: 'Bearer ' + localStorage.getItem('token'),
        // baseURL : import.meta.env.VUE_APP_BASE_API ||  'http://192.168.2.13:8887',
        mavonValue : 'dfzdfvsdfsdf123123123'
    }
  },
  created () {
    console.log(36)
  },
  methods : {
    /*
    imgAdd (pos,$file) {
      console.log(23,pos,$file,this.$refs.md)
      var _this = this
      let {baseURL, userId, Authorization} = this
      let formData = new FormData()
      formData.append('userId',userId)
      formData.append('busType','text_editor')
      formData.append('Authorization',Authorization)
      formData.append('file',$file)
      uploadFile
                  .batchUpload(formData).then(res=>{
                    console.log(39,res)
                    _this.$refs.md.$img2Url(pos,baseURL+res.data[0].url)
                  }).catch(err=>{
                    console.log(41,err)
                  })
    }
    */
  }
}
</script>