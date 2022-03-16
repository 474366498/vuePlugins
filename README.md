# Vue 3 + Typescript + Vite

## 前端代码 集中于 src  后台代码(node) 置于 server

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"



## 文件目录结构说明 ##
1. server node 环境启动代码 安装内容具体看package
2. src vue3 vite 前端代码

## 路由与页面内容说明 ##

1. buriedPoint 页面埋点
2. editor vue富文本编辑器  部分内容在v3下不兼容 `需要后期进行修改`
3. upload 上传 与server中有关联 `需要启动node服务开启上传接口`
4. big-file 大文件分片上传 `重复上传时 后台 node报错 ？？`
5. layout 中添加简单的换肤效果  `只是做了简单的文字颜色 文字大小 加粗功能`

在使用 pdfjs mammothjs中注意事项

1. pdfjs 在vue中使用时尽量把 pdfjs 返回的对象 绑定在 vue data 的第一层级上 
``
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
      return {
        ...toRefs(pdfInfo) ,
        onChangeViewPage
      }
    }
  })
  </script>

``
2. 在使用mammothjs时 用npm + import 在当前环境下(vue3,vue2好像也是有这个问题) 无法导入 直接在console.log(mammoth)时就会报错 且度娘上也没有相应的解决办法 
  解决 a. 通过网络 找到csdn进行下载 放入本地 

  ``
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.js" integrity="sha512-wXz/KbmHnUE9ognsq6vDZIsrCXErIol2uH+SUz/mCXMz6aM/mfiwfABcZNrPTwkeI2PhNxOTCJL0kvheWs8iIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <title>Vite App</title>
      </head>
      <body>
        <div id="app"></div>
        <script type="module" src="/src/main.ts"></script>
      </body>
    </html>
  
  ``
3. 在使用 mammothjs  xlsxjs 时 不要玩异步请求...
4. xlsxjs 更多 
    a. [demo](http://demo.haoji.me/2017/02/08-js-xlsx/)  
    b. [demo](http://blog.haoji.me/js-excel.html) 
    c. [官方api](https://github.com/rockboom/SheetJS-docs-zh-CN)

4. xlsxjs 导出 https://sheetjs.com/demo/table.html  

5. pptxjs 要使用jquery jquery-ui ....  [api](https://pptx.js.org/pages/docs.html) [demo](https://pptx.js.org/pages/demos.html)


``
    <script type="text/javascript" src="./ppt/jquery.js"></script>
    <script type="text/javascript" src="./ppt/jquery-ui.js"></script>
    <script type="text/javascript" src="./ppt/jszip.js"></script>
    <script type="text/javascript" src="./ppt/filereader.js"></script>
    <script type="text/javascript" src="./ppt/d3.min.js"></script>
    <script type="text/javascript" src="./ppt/nv.d3.js"></script>
    <script type="text/javascript" src="./ppt/pptx.js"></script>
    <script type="text/javascript" src="./ppt/divs2slides.js"></script>

``














