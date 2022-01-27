import Vue, { createApp } from 'vue'
import naive, { create, NButton, NInput } from 'naive-ui'   // naive-ui
import ElementPlus from 'element-plus'   // element-plus vue 3
import 'element-plus/dist/index.css'     // element-plus css
import tinymce from '_tinymce@5.10.2@tinymce'  // tinymce 5

import router from './router/index'
import App from './App.vue'
import defectives from './utils/directive/index'
import track from './utils/directive/track'

/* v-md-editor start
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
// v-md-editor end*/



console.log(4, defectives, ElementPlus, tinymce)

const app = createApp(App)
// 挂载全局方法 类似 vue2 vue.$tinymce = tinymce
app.config.globalProperties.$tinymce = tinymce
console.log(app)
// 埋点 start
// 单提 组件化
app.directive('track', track)
/* 合并 非组件化
import Exposure from './utils/buriedPoint/exposure'
import Click from './utils/buriedPoint/click'
console.log(12, Exposure)
const cli = new Click()
const exp = new Exposure()

app.directive('track', {
  created(el: HTMLElement, binding: any) {
    console.log(18, el)
    const { arg } = binding
    console.log(19, arg)
    arg.split('|').forEach((item: string) => {
      if (item === 'click') {
        console.log(21, 'click')
        cli.add({ el })
      } else if (item === 'exposure') {
        exp.add({ el })
      }
    })
  }
})
*/

console.log(32, app)

// 埋点 end

/*
navie 按需引入
const _naive = create({
  components: [NButton,
    NInput]
})
app.use(_naive)
*/
app.use(router)
app.use(naive)
app.use(ElementPlus)
// app.use(VMdEditor)


console.log(app)
app.mount('#app')
