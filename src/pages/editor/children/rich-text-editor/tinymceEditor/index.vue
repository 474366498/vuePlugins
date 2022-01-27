<template>
  <div class="SEditor">
    <textarea class="my_editor" id="textarea" v-model="tinymceValue"></textarea>
    <el-input
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 8 }"
      v-model="tinymceValue"
    />
    <el-button @click="e => onGetTinymceValue()">get</el-button>
  </div>
</template>

<script type="text/javascript">
// 富文本编辑器是否弄个全屏 1.toolbar 2.自定义一个节点用来控制
import 'tinymce/themes/silver/theme' //编辑器主题，不引入则报错
import 'tinymce/icons/default'  //引入编辑器图标icon，不引入则不显示对应图标

import 'tinymce/plugins/batchUploadImage/plugin'

import 'tinymce/plugins/image/plugin' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/paste' // ctrl c ctrl v

import './langs/zh_CN.js'
// 引入编辑器插件
import 'tinymce/plugins/advlist'  //高级列表
import 'tinymce/plugins/anchor'  //锚点
import 'tinymce/plugins/autolink'  //自动链接
import 'tinymce/plugins/autoresize'  //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import 'tinymce/plugins/autosave'  //自动存稿
import 'tinymce/plugins/charmap'  //特殊字符
import 'tinymce/plugins/code'  //编辑源码
import 'tinymce/plugins/codesample'  //代码示例
import 'tinymce/plugins/directionality'  //文字方向
import 'tinymce/plugins/emoticons'  //表情
import 'tinymce/plugins/fullpage'  //文档属性
import 'tinymce/plugins/fullscreen'  //全屏
import 'tinymce/plugins/help'  //帮助
import 'tinymce/plugins/hr'  //水平分割线
import 'tinymce/plugins/image'  //插入编辑图片
import 'tinymce/plugins/importcss'  //引入css
import 'tinymce/plugins/insertdatetime'  //插入日期时间
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/nonbreaking' //插入不间断空格
import 'tinymce/plugins/pagebreak' //插入分页符
import 'tinymce/plugins/paste' //粘贴插件
import 'tinymce/plugins/preview'//预览
import 'tinymce/plugins/print'//打印
import 'tinymce/plugins/quickbars'  //快速工具栏
import 'tinymce/plugins/save'  //保存
import 'tinymce/plugins/searchreplace'  //查找替换
// import 'tinymce/plugins/spellchecker'  //拼写检查，暂未加入汉化，不建议使用
import 'tinymce/plugins/tabfocus'  //切入切出，按tab键切出编辑器，切入页面其他输入框中
import 'tinymce/plugins/table'  //表格
import 'tinymce/plugins/template'  //内容模板
import 'tinymce/plugins/textcolor'  //文字颜色
import 'tinymce/plugins/textpattern'  //快速排版
import 'tinymce/plugins/toc'  //目录生成器
import 'tinymce/plugins/visualblocks'  //显示元素范围
import 'tinymce/plugins/visualchars'  //显示不可见字符
import 'tinymce/plugins/wordcount'  //字数统计

import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import 'tinymce/skins/content/default/content.min.css'
// const language_url = require('./langs/zh_CN.js')
// import { uploadFile } from '@/api/index.js'
console.log(27)
export default {
  data() {
    return {
      tinymceObj: null,
      tinymceValue: ` <p>qerct&nbsp;</p>`,
      width: 1000, // width
      height: 400, // height
      plugins:
        'advlist autolink link image batchUploadImage lists charmap  preview hr anchor pagebreak ', //配置插件：可自己随意选择，但如果是上传本地图片image和imagetools是必要的
      toolbar:
        'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image paste  batchUploadImage | forecolor backcolor',
      //工具框，也可自己随意配置lineheight（行高 5.5新增）
      // newdocument（新文档） bold（加粗） italic（斜体） underline（下划线） strikethrough（删除线） alignleft（左对齐） aligncenter（居中对齐） alignright（右对齐） alignjustify（两端对齐） styleselect（格式设置） formatselect（段落格式） fontselect（字体选择） fontsizeselect（字号选择） cut（剪切） copy（复制） paste（粘贴）bullist（项目列表UL）numlist（编号列表OL）outdent（减少缩进）indent（增加缩进）blockquote（引用）undo（撤销）redo（重做/重复）removeformat（清除格式）subscript（下角标）superscript（上角标）paste powerpaste()
      menubar: false, // 菜单
      readonly: null, // 是否可编辑
      branding: false, // 商标
      paseImage: true, // 本地图片黏贴编辑器
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      baseURL : import.meta.env.VUE_APP_BASE_API ||  'http://192.168.2.13:8887',
    }
  },
  mounted() {
    console.log(55)
    this.tinymceInit()
  },
  beforeDestroy() {
    this.$tinymce.remove()
  },
  // http://localhost:3000/plugins/batchUploadImage/index.html
  methods: {
    tinymceInit() {
      console.log('mount', this.$tinymce)
      let _this = this
      let { menubar, plugins, toolbar, width, height, branding } = this
      _this.$tinymce.baseURL = 'http://localhost:3000/tinymce/'     // 地址要选 当前项目运行的前端地址  并在 public 中 添加相应的 tinymce 文件夹包
      _this.$tinymce
        .init({
          selector: '#textarea',
          language_url: './langs/zh_CN.js', //设置中文
          language: 'zh_CN',
          menubar,
          width,
          height,
          skin_url:'/tinymce/skins/ui/oxide' ,
          plugins, //工具框，也可自己随意配置
          toolbar,
          paste_data_images: true, // 设置为“true”将允许粘贴图像，而将其设置为“false”将不允许粘贴图像。
          a11y_advanced_options: true,
          a11ychecker_html_version: 'html5',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          branding,
          image_title: false, // 是否开启图片标题设置的选择，这里设置否
          automatic_uploads: true,
          // 图片异步上传处理函数
          images_upload_handler: (blobInfo, success, failure) => {
            console.log(56, blobInfo.blob(), success, failure)
            var formData
            formData = new FormData()
            formData.append('file', blobInfo.blob())
            var { baseURL, userId, Authorization } = _this
            formData.append('userId', userId)
            formData.append('busType', 'text_editor')

            formData.append('Authorization', Authorization)
            console.log(formData)
            uploadFile
              .batchUpload(formData)
              .then(res => {
                console.log(64, res, baseURL + res.data[0].url)
                let fileUrl = baseURL + res.data[0].url
                success(fileUrl)
              })
              .catch(err => {
                console.log(66, err)
              })
          },
          init_instance_callback: editor => {
            console.log(82, editor)
            _this.tinymceObj = editor
            // editor.on('keyup', env => {
            //   // 获取富文本编辑器里面的内容
            //   console.log('keyUp', env)
            //   _this.tinymceValue = editor.getContent()
            // })
            editor.on('focus blur', () => {
              console.log('f b')
              _this.tinymceValue = editor.getContent()
            })
            editor.on('paste', env => {
              /*
                通过 getContent() 获取到内容 进行 fileUrl(上传回来的结果 组合而成的图片全路径)
                把base64 replace(替换) fileUrl
                  1.通过把file 转成 base64 用这个base64 对比 tinymce 的 value 时行替换
                  2.要注意一点 图片在上传时 file 的filename 默认是 => 图片.png 通过时间戳生成新的图片名 避免后端返回的一直是一个图片路径
              */
              console.log(138, env)
              const items = (env.clipboardData || window.clipboardData).items
              const text = (env.clipboardData || window.clipboardData).getData(
                'Text'
              )
              console.log(140, items, text)

              const formData = new FormData()
              var fileBase64
              var isSubmit = false
              for (let i = 0; i < items.length; i++) {
                let item = items[i],
                  type = item.type

                if (type.indexOf('image') !== -1) {
                  const file = item.getAsFile()
                  console.log('图片', item, file)
                  let url = URL.createObjectURL(file)
                  let base64 = blobToDataURL(file, base64 => {
                    fileBase64 = base64
                    console.log(157, base64)
                  })
                  let fileName = '图片_' + new Date().getTime() + '.png'
                  let newFile = new File([file], fileName, { type: file.type })
                  console.log(162, file, fileName, file.type, newFile)

                  formData.append('file', newFile)
                  isSubmit = true
                }
              }
              if (!isSubmit) {
                console.log('没有图片 不用上传')
              } else {
                console.log(153, formData)
                var { baseURL, userId, Authorization } = _this
                console.log(151, baseURL, userId, Authorization)
                formData.append('userId', userId)
                formData.append('busType', 'text_editor')

                formData.append('Authorization', Authorization)
                console.log(formData)
                uploadFile
                  .batchUpload(formData)
                  .then(res => {
                    console.log(64, res, baseURL + res.data[0].url)
                    let fileUrl = baseURL + res.data[0].url
                    let newValue = this.tinymceObj
                      .getContent()
                      .replace(fileBase64, fileUrl)
                    console.log(180, fileUrl, fileBase64, newValue)
                    this.tinymceObj.setContent(newValue)
                    // success(fileUrl)
                  })
                  .catch(err => {
                    console.log(66, err)
                  })
              }
            })
          }
          // setup: function(editor) {
          //   editor.on('Paste', function(e) {
          //     console.log(149, e.clipboardData, window.clipboardData)
          //     console.log(editor.getContent())
          //   })
          // }
        })
        .then(resolve => {
          // 初始化富文本编辑器里面的内容
          console.log(66, resolve)
          // resolve[0].setContent(_this.tinymceValue)
        })
    },
    pasteHandle(e) {
      console.log(155, e)
      var cbData
      if (e.clipboardData) {
        cbData = e.clipboardData
      } else if (window.clipboardData) {
        cbData = window.clipboardData
      }

      console.log(173, cbData, cbData.items.length)
      if (cbData && cbData.items) {
        // if ((text = cbData.getData('text/plain'))) {
        //   return
        // }
        for (let i = 0; i < cbData.items.length; i++) {
          console.log(186, cbData.items[i].kind, cbData.items[i].type)
          let cbItem = cbData.items[i]
          let { kind, type } = cbItem
          if (kind === 'string' && type === 'text/html') {
            console.log('html')
          } else if (kind === 'string' && type === 'text/rtf') {
            console.log('rtf')
          } else if (kind === 'file' && type.indexOf('image') !== -1) {
            console.log('image ', cbItem)
            var files = cbItem.files
            console.log(196, files.length)
            var reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = function(e) {
              var img = new Image()
              img.src = reader.result //获取64位的base码
              console.log(202, img.src)
            }
            var blob = cbItem.getAsFile()
            readPastedBlob(blob)
          }
        }
      }

      function readPastedBlob(blob) {
        if (blob) {
          reader = new FileReader()
          reader.onload = function(evn) {
            pasteImage(env.target.result)
          }
          reader.readAsDataURL(blob)
        }
      }
      function pasteImage(source) {
        var image = `<img src="${source}" />`
        _this.tinymceObj.execCommand('mceInsertContent', false, image)
      }
    },
    onGetTinymceValue() {
      console.log(this.tinymceObj.getContent())
    }
  }
}
// file 转 base64
const blobToDataURL = (blob, cb) => {
  let reader = new FileReader()
  reader.onload = function(evt) {
    let base64 = evt.target.result
    cb(base64)
  }
  reader.readAsDataURL(blob)
}
</script>

<style lang="scss" scoped>
#textarea {
  border: 1px solid red;
}
</style>
