<template>
  <section class="flex flex-dir-c">
    <div class="editor" style="width:1000px;"></div>
    <el-input
      type="textarea"
      disabled
      :autosize="{ minRows: 4, maxRows: 8 }"
      v-model="editorValue"
    />
    <el-switch active-text="可编辑" inactive-text="禁用" v-model="editorEditable"></el-switch>
    <el-button @click="getEditorInfo">get</el-button>
    <transition name="fade">
      <div @click="wangImgView=null" class="flex flex-jc-c flex-ai-c wang-img-view-wrapper" v-if="wangImgView">
        <img :src="wangImgView" alt="none">
      </div>
    </transition>
  </section>
</template>

<script>
import Editor from './wangEditor.js'
// import { uploadFile } from '@/api/index.js'

console.log(Editor)
export default {
  name : 'wang-use-editor' ,
  cname : 'wangEditorJS 编辑器',
  data () {
    return {
      editorObj : null ,
      editorValue : '<p>aef af</p><p><br/></p><p><br/></p><p><iframe src="http://192.168.2.10:8887/file/127/838cec759a23432a900fc3a68aa1c669.mp4" style="width:650px;height: 366px" frameborder="0"></iframe><img src="http://192.168.2.10:8887/file/127/07f3a58dd19e4910a6c09ad7daabfab1.jpg" contenteditable="false" style="max-width: 100%;"/></p><br/>' ,
      editorEditable : true,
      wangImgView : null , // 大图预览
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      baseURL: process.env.VUE_APP_BASE_API ,
      defaultConfig : {
        showLinkImg : false ,
        showLinkImgAlt : false ,
        showLinkImgHref : false ,
        height : 600
      },
      // 上传图片
      uploadImgConfig :{ // uploadImgHooks customUploadImg 二选一
        // debug : true ,
        // uploadImgServer : process.env.VUE_APP_BASE_API + '/batchUpload' ,
        // uploadFileName : 'file' ,
        // uploadImgMaxSize :3 * 1024 * 1024 ,
        // uploadImgParams : {
        //   userId: localStorage.getItem('userId'),
        //   'busType':'text_editor',
        //   Authorization: 'Bearer ' + localStorage.getItem('token')
        // },
        // uploadImgHeaders : {
        //   accept : 'application/json, text/plain, */*' ,
        //   Authorization : 'Bearer ' + localStorage.getItem('token')
        // },
        // uploadImgUseEvents : {
        //   dblclick : e => {
        //     console.log(52,e)
        //     this.wangImgView = e.src
        //   }
        // },
        // uploadImgHooks :{
        //   before : (xhr,editor,files) =>{
        //     console.log('before',xhr,files)
        //     // return {
        //     //   pervent : true
        //     // }
        //   },
        //   success : (xhr,editor,res) => {
        //     console.log('success',xhr)
        //   },
        //   fail : (xhr,editor,res) =>{
        //     console.log(xhr,editor,res)
        //   },
        //   error : (xhr,editor,res) =>{
        //     console.log(xhr,editor,res)
        //   },
        //   customInsert : (insertFn , res) =>{
        //     console.log(insertFn,res)
        //     let {baseURL} = this
        //     if(res.data.length > 1) {
        //       for(let i=0;i<res.data.length;i++) {
        //         insertFn(baseURL+res.data[i].url)
        //       }
        //     }else{
        //       insertFn(baseURL+res.data[0].url)
        //     }
        //   }
        // },
        customUploadImg : (files,insertFn) =>{
          console.log(50,files,insertFn)
          let {baseURL, userId, Authorization} = this
          let formData = new FormData()
          if(files.length > 1) {
            for(let i = 0 ; i < files.length ;i++) {
              formData.append('file',files[i])
            }
          }else{
            formData.append('file',files[0])
          }
          formData.append('userId',userId)
          formData.append('busType','text_editor')
          formData.append('Authorization',Authorization)
          uploadFile
                  .batchUpload(formData).then(res=>{
                    console.log(39,res)
                    if(res.data.length > 1) {
                      for(let i=0;i<res.data.length;i++) {
                        insertFn(baseURL+res.data[i].url)
                      }
                    }else{
                      insertFn(baseURL+res.data[0].url)
                    }
                  }).catch(err=>{
                    console.log(41,err)
                  })
        }
      },
      pasteConfig : {
        pasteFilterStyle : false ,
        pasteIgnoreImg : false ,
        pasteTextHandle  : paste => {
          console.log(104,paste)
        }
      },
      // 上传视频
      uploadVideoConfig : { // uploadVideoHooks customUploadVideo 二选一
        showLinkVideo  : false ,
        uploadVideoServer : process.env.VUE_APP_BASE_API + '/batchUpload' ,
        uploadVideoName  : 'file' ,
        uploadVideoMaxSize  :300 * 1024 * 1024 ,
        uploadVideoParams  : {
          userId: localStorage.getItem('userId'),
          'busType':'text_editor',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        uploadVideoHeaders  : {
          accept : 'application/json, text/plain, */*' ,
          Authorization : 'Bearer ' + localStorage.getItem('token')
        },
        uploadVideoHooks : {
          before : (xhr,editor,files) =>{

          },
          success : (xhr,editor,res)=>{},
          fail : (xhr,editor,res) => {},
          error : (xhr,editor,res) => {},
          customInsert : (insertFn , res) => {
            console.log(insertFn,res)
            let {baseURL} = this
            if(res.data.length > 1) {
              for(let i=0;i<res.data.length;i++) {
                insertFn(baseURL+res.data[i].url)
              }
            }else{
              insertFn(baseURL+res.data[0].url)
            }
          }
        }
        // customUploadVideo  : (files,insertFn) => {
        //   console.log(files,insertFn)
        //   let {baseURL, userId, Authorization} = this
        //   let formData = new FormData()
        //   if(files.length > 1) {
        //     for(let i = 0 ; i < files.length ;i++) {
        //       formData.append('file',files[i])
        //     }
        //   }else{
        //     formData.append('file',files[0])
        //   }
        //   formData.append('userId',userId)
        //   formData.append('busType','text_editor')
        //   formData.append('Authorization',Authorization)
        //   uploadFile
        //           .batchUpload(formData).then(res=>{
        //             console.log(39,res)
        //             if(res.data.length > 1) {
        //               for(let i=0;i<res.data.length;i++) {
        //                 insertFn(baseURL+res.data[i].url)
        //               }
        //             }else{
        //               insertFn(baseURL+res.data[0].url)
        //             }
        //           }).catch(err=>{
        //             console.log(41,err)
        //           })
        // }
      }
    }
  },
  watch : {
    editorEditable (newV) {
      this.editorObj && this.editorObj.$textElem.attr('contenteditable',newV)
    }
  },
  mounted () {
    if(!this.editorObj){
      let {defaultConfig , uploadImgConfig , pasteConfig , uploadVideoConfig , editorValue} = this
      let editorEl = document.querySelector('.editor')
      console.log(editorEl)
      this.editorObj = new Editor(editorEl)
      console.log(33,this.editorObj.config)
      let {config} = this.editorObj
      this.editorObj.config  = Object.assign({},config, defaultConfig , uploadImgConfig , pasteConfig , uploadVideoConfig)
      // onSelectionChange onChange
      console.log(this.editorObj)
      this.editorObj.create()
      if(editorValue){
        this.editorObj.txt.html(editorValue)
      }
    }
  },
  beforeDestroy () {
    this.editorObj.destroy()
    this.editorObj = null
  },
  methods : {
    getEditorInfo () {
      console.log(this.editorObj)
      console.log(this.editorObj.txt.html())
      this.editorValue = this.editorObj.txt.html()
    }
  }
}
</script>

<style lang="scss" scoped>
  .wang-img-view-wrapper{
    position:fixed;
    top:0;
    bottom:0;
    left:0;right:0;
    background:rgba(0,0,0,.75);
    z-index:11000;
    padding:50px;
    img{
      height: 100%;
      width:auto;
    }
  }
</style>





/*
  configs  具体内容 wangeditor/dist/config/index.d.ts
    height: number;
    languageType: string[];
    languageTab: string;
    menus: string[]; // 定义显示哪些菜单和菜单的顺序  默认菜单 ['head','bold','fontSize','fontName','italic','underline','strikeThrough','indent','lineHeight','foreColor','backColor','link','list','todo','justify','quote','emoticon','image','video','table','code','splitLine','undo','redo']
    excludeMenus: string[]; // 当只需剔除少数菜单的时候，直接设置不需要的菜单
    /*不要同时使用 editor.config.menus 和 editor.config.excludeMenus，以免引起冲突和混乱。*/
    fontNames: FontStyleType; // 编辑器的字体
    lineHeights: string[]; // 编辑器的行高 ['1', '1.15', '1.6', '2', '2.5', '3']
    showMenuTooltips: boolean; // 编辑器的菜单栏提示
    indentation: IndentationType;
    fontSizes: FontSizeConfType;  // {
                                      'x-small': { name: '10px', value: '1' },
                                      'small': { name: '13px', value: '2' },
                                      'normal': { name: '16px', value: '3' },
                                      'large': { name: '18px', value: '4' },
                                      'x-large': { name: '24px', value: '5' },
                                      'xx-large': { name: '32px', value: '6' },
                                      'xxx-large': { name: '48px', value: '7' }
                                    }
    colors: string[];  // 编辑器的字体颜色和背景色
    emotions: EmotionsType[]; // 配置表情图标
                          [{
                              title: '新浪', // tab 的标题
                              type: 'image', // 'emoji' 或 'image' ，即 emoji 形式或者图片形式
                              content: [
                                  { alt: '[坏笑]', src: `${SINA_URL_PATH}/50/pcmoren_huaixiao_org.png` },
                                  { alt: '[舔屏]', src: `${SINA_URL_PATH}/40/pcmoren_tian_org.png` },
                                  { alt: '[污]', src: `${SINA_URL_PATH}/3c/pcmoren_wu_org.png` },
                              ]
                          },
                          {
                              title: 'emoji',  // tab 的标题
                              type: 'emoji', // 'emoji' / 'image'
                              // emoji 表情，content 是一个数组即可
                              content: '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐'.split(/\s/),
                          }]
    zIndex: number;
    onchange: Function | null; // 用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发
    onfocus: Function; // 聚焦 (newHtml) =>
    onblur: Function; // 失焦 (newHtml) =>
    onchangeTimeout: number;  // 当我们使用兼容模式的时候，可以自定义记录的频率，默认 200 ms
    pasteFilterStyle: boolean; // 复制文本到编辑器中，编辑器会默认过滤掉复制文本的样式 默认true
    pasteIgnoreImg: boolean; // 复制过来的内容，除了包含文字还可能包含图片
    pasteTextHandle: Function; // 对粘贴的文本内容进行自定义的过滤、处理等操作 (pasteStr)=>
    styleWithCSS: boolean;
    linkImgCallback: Function; // 插入网络图片的回调 (src,alt,href) =>
    onSelectionChange: Function; // 用户选区操作（鼠标选中文字，ctrl+a 全选等）会自动触
    placeholder: string;
    zIndexFullScreen: number;
    showFullScreen: boolean; // 全屏功能  监听boolean editor.fullScreen() editor.unFullScreen()
    showLinkImg: boolean; // 是否示开启 插入网络图片的功能 默认true
    showLinkImgAlt: boolean; // 插入网络图片功能可以分别设置添加alt属性和跳转链接选项
    showLinkImgHref: boolean;// 插入网络图片功能可以分别设置添加alt属性和跳转链接选项
    uploadImgAccept: string[]; // 限制图片类型
    uploadImgServer: string; // 服务端接口
    uploadImgShowBase64: boolean; // 可使用 base64 格式保存图片 与 uploadImgServer 不能同时使用
    uploadImgMaxSize: number; // 限制图片大小 2*1024*1024 => 2M
    uploadImgMaxLength: number; // 一次最多能传几张图片 默认100
    uploadFileName: string;    // 可自定义 filename
    uploadImgParams: DicType;  // 上传图片时可自定义传递一些参数，例如传递验证的 token 等 {token,userId}
    uploadImgParamsWithUrl: boolean; // 如果需要将参数拼接到 url 中，可修改boolean true
    uploadImgHeaders: DicType;  // 请求的 header {accept :'text/x-json' ,a:100}
    uploadImgHooks: UploadImageHooksType;  // 可使用回调函数，对上传图片的不同阶段，做相应处理
        {
          before : (xhr) => {} ,
          success : (xhr) => {},
          fail : (xhr,editor,resData) =>{},
          error:(xhr,editor,resData) => {},
          timeout : (xhr) =>{} ,
          customInsert :(insertImgFn,result) => {
            console.log('customInsert', result)
            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImgFn(result.data[0])
          }
        }
    uploadImgTimeout: number;  // 上传接口等待的最大时间，默认是 10 秒钟
    withCredentials: boolean; // 跨域上传中如果需要传递 cookie 需设置 withCredentials
    customUploadImg: Function | null;  // 想完全自己实现图片上传的过程 (files,insertFn) =>
    uploadImgFromMedia: Function | null;
    customAlert: Function; (s:msg文字提示内容,t:类型)=>

    onCatalogChange: Function | null;  // 通过 onCatalogChange 可以实时获取编辑器所有标题，标题变化即可触发该回调函数。(headList) => { let headId = headList[0].id ; editor.scrollToHead(headId) }
    lang: string;
    languages: typeof langConfig;
    linkCheck: Function; // 检查插入的链接 (text,link) =>
    linkImgCheck: Function; // 自定义检查插入图片的链接  (imgSrc,alt,href) => {
                                                        1. 返回 true ，说明检查通过
                                                        return true
                                                        2. 返回一个字符串，说明检查未通过，编辑器会阻止图片插入。会 alert 出错误信息（即返回的字符串）
                                                        return string
                                                        3.返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止图片插入。此处，你可以自定义提示错误信息，自由发挥
                                                        return undefined
                                                      }
    compatibleMode: () => boolean; // 配置当前的历史记录模式 默认情况下，只有 IE 和 旧版 Edge 会使用兼容模式，如果需要在其它浏览器上也使用兼容模式，可以在函数内进行判
    historyMaxSize: number; // 还可以修改历史记录的步数。默认 30 步
    focus: boolean;  // 自动focus
    onlineVideoCheck: Function; // 自定义检查插入网络视频的内容 (video) => 与 linkImgCheck 类似
    onlineVideoCallback: Function; // 自定义检查插入视频的回调 (video) =>
    showLinkVideo: Boolean;
    uploadVideoAccept: string[];
    uploadVideoServer: string; // 配置 server 接口地址
    uploadVideoMaxSize: number;
    uploadVideoName: string;
    uploadVideoParams: DicType;
    uploadVideoParamsWithUrl: boolean;
    uploadVideoHeaders: DicType;
    uploadVideoHooks: UploadVideoHooksType;
    uploadVideoTimeout: number;
    withVideoCredentials: boolean;
    customUploadVideo: Function | null;
    customInsertVideo: Function | null;
    menuTooltipPosition: tooltipPositionType; // 配置显示上标(up)还是下标(down)

  代码高亮  https://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/07-%E4%BB%A3%E7%A0%81%E9%AB%98%E4%BA%AE.html
    npm install --save highlight.js
    import hljs form 'highlight.js'
    import 'highlight.js/styles/monokai-sublime.css'
    editor.highlight = hljs

  设置内容
    html 放置节点内容于要生成的节点
    js  editorObj.create() editorObj.txt.html('html节点内容')
  禁用/可编辑
  editor.disable() editor.enable()
  销毁编辑器
  this.editor.destroy()

编辑器唯一的 id editor.id

编辑器的所有配置 editor.config

编辑区域 DOM 节点 editor.$textElem.elems[0] ，元素 id editor.textElemId

菜单栏 DOM 节点 editor.$toolbarElem.elems[0] ，元素 id editor.toolbarElemId


选中的文字 editor.selection.getSelectionText()

选区所在的 DOM 节点 editor.selection.getSelectionContainerElem().elems[0]

选区开始的 DOM 节点 editor.selection.getSelectionStartElem().elems[0]

选区结束的 DOM 节点 editor.selection.getSelectionEndElem().elems[0]

折叠选区 editor.selection.collapseRange()

判断选区是否为“空”（即没有选中任何文字）editor.selection.isSelectionEmpty()

*/