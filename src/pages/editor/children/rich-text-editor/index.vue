<template>
  <section class="flex flex-dir-c">
    <h4>富文本编辑器 {{componentName}}</h4>
    <div class="flex flex-jc-c">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="item in editorList" :key="item.id" :label="item.label">
          <keep-alive>
            <component :is="componentName" v-if="componentName.indexOf(item.value) >= 0"></component>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
// import TinymceEditor from './tinymceEditor/index.vue'
import MavonUseEditor from './mavonEditor/index.vue'
// import WangUseEditor from './wangEditor/index.vue'
// import CKUseEditor from './CKEditor/index.vue'

export default {
  name : 'rich-text-editor' ,
  cname : '富文本编辑器类' ,
  data() {
    return {
      activeName : '0' ,
      editorList : [
        {id : 'editor01' , label : 'Tinymce' , value : 'Tinymce'},
        {id : 'editor02' , label : 'MavonUse' , value : 'MavonUse'},
        {id : 'editor03' , label:'WangEditor', value:'WangUse'},
        {id : 'editor04' , label : 'CKEditor', value:'CKUse'}

      ]
    }
  },
  computed : {
    componentName () {
      let {activeName ,editorList} = this
      return editorList[activeName].value + 'Editor'
    }
  },
  components : {
    // TinymceEditor ,
    MavonUseEditor ,
    // WangUseEditor ,
    // CKUseEditor
  }
}
</script>