<template>
  <section class="flex flex-dir-c">
    <div name="ckeditor" class="editor" style="max-width:1010px;width:1000px;min-height:500px">
    <ckeditor  :editor="editor" v-model="editorValue" :config="editorConfig"></ckeditor>
    </div>
     <el-input
      type="textarea"
      disabled
      :autosize="{ minRows: 4, maxRows: 8 }"
      v-model="editorValue"
    />
    <el-switch v-model="editorEditAble" active-text="编辑开" inactive-text="编辑关" />
  </section>
</template>

<script>
// 更多  https://github.com/ckeditor/ckeditor5-vue2/blob/master/src/ckeditor.js 百度吧
import Vue from 'vue'
// import CkEditor from '@ckeditor/ckeditor5-vue2'
import CkEditor from './ckeditor/ckeditor5-vue2.js'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
import {customUploadAdapterPlugin} from './ckeditor/upload.js'
Vue.use(CkEditor)
let _c = new ClassicEditor()
let {...args} = _c
console.log(26,_c , {...args} , CkEditor)
export default {
  name : 'ck-use-editor' ,
  cname : 'CKEditor 编辑器',
  data () {
    return {
      editorObj : null ,
      editorValue : null ,
      editorEditAble : true,
      editor : ClassicEditor ,
      editorConfig : {
        width:1000,
        hegiht:400,
        resize_minHeight:500,
        language : 'zh-cn' ,
        extraPlugins : [customUploadAdapterPlugin]
      }
    }
  }
  // mounted () {
  //   if(!this.editorObj) {

  //     // this.editorObj = CKEDITOR.replace('ckeditor')
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.editor{
  .ck-editor__editable {
      min-height: 400px;
  }
}
</style>

/*
 ckeditor5-vue2
  props {
    editor: {
			type: Function,
			default: null
		},
		value: {
			type: String,
			default: ''
		},
		config: {
			type: Object,
			default: () => ( {} )
		},
		tagName: {
			type: String,
			default: 'div'
		},
		disabled: {
			type: Boolean,
			default: false
		}
  }


*/