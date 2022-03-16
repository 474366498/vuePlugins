<template>
  <section>
    <ul>
      <li v-for="item in fileList" :key="item.index">
        <span>{{item.path}}</span>
        <span @click="e=>onOpenView(item)">点点</span>
      </li>
    </ul>
    <div>{{viewInfo}}</div>
    <component :is="viewCom" :path="viewInfo.path"></component>
  </section>
</template>

<script lang="ts">
import Vue , {defineComponent , ref , reactive, computed} from 'vue'
// console.log(10,html2json(divStr))
// https://juejin.cn/post/6995856687106261000
import pdfView from './children/pdf.vue'
import wordView from './children/word.vue'
import execlView from './children/execl.vue'
import pptView from './children/ppt.vue'
export default defineComponent({
  name : 'file-view' ,
  cname : '动态预览文件',
  components:{
    pdfView
  },
  setup (){
    const fileList = ref([
      {index:1, path:'files/node.pdf'},
      {index:2, path:'files/a1.xls'},
      {index:3, path:'files/a1.xlsx'},
      {index:4, path:'files/b1.doc'},
      {index:5, path:'files/b1.docx'},
      {index:6, path:'files/cc.pptx'},
    ])
    let viewCom = computed(()=>{
      const viewMap = {
        pdf : pdfView ,
        doc : wordView ,
        docx : wordView ,
        xls : execlView ,
        xlsx : execlView ,
        pptx : pptView
      }
      return viewInfo.type ? viewMap[viewInfo.type] : null
    })
    let viewInfo = reactive({
      show : false ,
      path:null ,
      type : null
    })
    const onOpenView = (item)=>{
      console.log(item)
      let path = item.path 
      viewInfo.type = path.split('.')[1] 
      viewInfo.path = item.path
      viewInfo.show = true
    }
    return {
      fileList ,
      viewCom ,
      viewInfo , 
      onOpenView
    }
  }
})
</script>
