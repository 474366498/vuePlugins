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
6. multimedia 页面中一些内容 [原文链接](https://blog.csdn.net/qq_47703624/article/details/107556369)
  a.  media (audio video ) 属性
    src 歌曲的路径
    preload 是否在页面加载后立即加载（设置 autoplay 后无效）
    controls 显示 audio 自带的播放控件
    loop 音频循环
    autoplay 音频加载后自动播放
    currentTime 音频当前播放时间
    duration 音频总长度
    ended 音频是否结束
    muted 音频静音为 true
    volume 当前音频音量
    readyState 音频当前的就绪状态
  b. media (audio video ) 事件方法
    abort 当音频/视频的加载已放弃时
    canplay 当浏览器可以播放音频/视频时
    canplaythrough 当浏览器可在不因缓冲而停顿的情况下进行播放时
    durationchange 当音频/视频的时长已更改时
    emptied 当目前的播放列表为空时
    ended 当目前的播放列表已结束时
    error 当在音频/视频加载期间发生错误时
    loadeddata 当浏览器已加载音频/视频的当前帧时
    loadedmetadata 当浏览器已加载音频/视频的元数据时
    loadstart 当浏览器开始查找音频/视频时
    pause 当音频/视频已暂停时
    play 当音频/视频已开始或不再暂停时
    playing 当音频/视频在已因缓冲而暂停或停止后已就绪时
    progress 当浏览器正在下载音频/视频时
    ratechange 当音频/视频的播放速度已更改时
    seeked 当用户已移动/跳跃到音频/视频中的新位置时
    seeking 当用户开始移动/跳跃到音频/视频中的新位置时
    stalled 当浏览器尝试获取媒体数据，但数据不可用时
    suspend 当浏览器刻意不获取媒体数据时
    timeupdate 当目前的播放位置已更改时
    volumechange 当音量已更改时
    waiting 当视频由于需要缓冲下一帧而停止
  c. 主要用的几个事件方法 
    ```typescript 
      <audio id='audio' ref='mediaRef' v-if='/^audio/.test(type)' controls autoplay 
        @timeupdate="e=>onMediaPlaying(e)"
        @seeked="e=>onMediaSeeked(e)"
        @pause="e=>onMediaPause(e)"
      >
      <source :src='src' :type='type' />
      </audio>
      <video id='video' ref='mediaRef' v-else controls autoplay 
        @timeupdate="e=>onMediaPlaying(e)"
        @seeked="e=>onMediaSeeked(e)"
        @pause="e=>onMediaPause(e)"
      >
        <source :src='src' :type='type' />
      </video>
      // 同类型 下一步播放 重置 src 并用 play重新开始
      const playNext = () => {
        let elType = type.value 
        console.log(elType , /^audio/.test(elType))
        let el:HTMLAudioElement|HTMLVideoElement = document.getElementById(/^audio/.test(elType) ? 'audio' : 'video')
        // let 
        console.log(79,el , mediaRef.value ,src.value)
        el.src = src.value   
        el.play()
      }
      // 媒体播放中...
      const onMediaPlaying = e =>{
        playLoc.value = e.target.currentTime
        let { currentTime , duration } = e.target 
        if(warnFn.value && typeof warnFn.value == 'function'){
          if(duration - currentTime < warnLoc.value) {
            warnFn.value()
          } 
        }
        // warnLoc  warnFn
        // console.log(94,e)
      }
      const onMediaSeeked = e =>{
        console.log('seeked',e)
      }
      const onMediaPause = e => {
        let {currentTime , duration} = e.target 
        context.emit('pause',e.target)
        console.log(currentTime === duration ? '停止' : '暂停')
      }
    
    
    ```



[HTML5多媒体的之audio和video。JavaScript控制进度条播放进度](https://blog.csdn.net/linpoxx/article/details/78336441)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HTML5-Video-Player</title>
    <style type="text/css">
        .videoPlayer{
            border: 1px solid #000;
            width: 600px;
        }
        #video{
            margin-top: 0px;
        }
        #videoControls{
            width: 600px;
            margin-top: 0px;
        }
        .show{
            opacity: 1;
        }
        .hide{
            opacity: 0;
        }
        #progressWrap{
            background-color: black;
            height: 25px;
            cursor: pointer;
        }
        #playProgress{
            background-color: red;
            width: 0px;
            height: 25px;
            border-right: 2px solid blue;
        }
        #showProgress{
            background-color: ;
            font-weight: 600;
            font-size: 20px;
            line-height: 25px;
        }
    </style>
</head>
<body>
<div class="">
    <h1>HTML5_Video_Player</h1>
    <div class="videoPlayer" id="videoContainer">
        <video id="video"
               width="600" height="360"
               preload controls
        >
            <source src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4" type='video/mp4'>
            <source src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.ogg" type='video/ogg'>
        </video>
        <div id="videoControls">
            <div id="progressWrap">
                <div id="playProgress">
                    <span id="showProgress">0</span>
                </div>
            </div>
            <div>
                <button id="playBtn" title="Play"> 播放 </button>
                <button id="fullScreenBtn" title="FullScreen Toggle">  全屏 </button>
            </div>
        </div>
    </div>
</div>
<script>
    (function(window, document){
        // 获取要操作的元素
        var video = document.getElementById("video");
        var videoControls = document.getElementById("videoControls");
        var videoContainer = document.getElementById("videoContainer");
        var controls = document.getElementById("video_controls");
        var playBtn = document.getElementById("playBtn");
        var fullScreenBtn = document.getElementById("fullScreenBtn");
        var progressWrap = document.getElementById("progressWrap");
        var playProgress = document.getElementById("playProgress");
        var fullScreenFlag = false;
        var progressFlag;

        // 创建我们的操作对象，我们的所有操作都在这个对象上。
        var videoPlayer = {
            init: function(){
                var that = this;
                video.removeAttribute("controls");
                bindEvent(video, "loadeddata", videoPlayer.initControls);
                videoPlayer.operateControls();
            },
            initControls: function(){
                videoPlayer.showHideControls();
            },
            showHideControls: function(){
                bindEvent(video, "mouseover", showControls);
                bindEvent(videoControls, "mouseover", showControls);
                bindEvent(video, "mouseout", hideControls);
                bindEvent(videoControls, "mouseout", hideControls);
            },
            operateControls: function(){
                bindEvent(playBtn, "click", play);
                bindEvent(video, "click", play);
                bindEvent(fullScreenBtn, "click", fullScreen);
                bindEvent(progressWrap, "mousedown", videoSeek);
            }
        }

        videoPlayer.init();

        // 原生的JavaScript事件绑定函数
        function bindEvent(ele, eventName, func){
            if(window.addEventListener){
                ele.addEventListener(eventName, func);
            }
            else{
                ele.attachEvent('on' + eventName, func);
            }
        }
        // 显示video的控制面板
        function showControls(){
            videoControls.style.opacity = 1;
        }
        // 隐藏video的控制面板
        function hideControls(){
            // 为了让控制面板一直出现，我把videoControls.style.opacity的值改为1
            videoControls.style.opacity = 1;
        }
        // 控制video的播放
        function play(){
            if ( video.paused || video.ended ){
                if ( video.ended ){
                    video.currentTime = 0;
                }
                video.play();
                playBtn.innerHTML = "暂停";
                progressFlag = setInterval(getProgress, 60);
            }
            else{
                video.pause();
                playBtn.innerHTML = "播放";
                clearInterval(progressFlag);
            }
        }
        // 控制video是否全屏，额这一部分没有实现好，以后有空我会接着研究一下
        function fullScreen(){
            if(fullScreenFlag){
                videoContainer.webkitCancelFullScreen();
            }
            else{
                videoContainer.webkitRequestFullscreen();
            }
        }
        // video的播放条
        function getProgress(){
            var percent = video.currentTime / video.duration;
            playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
            showProgress.innerHTML = (percent * 100).toFixed(1) + "%";
        }
        // 鼠标在播放条上点击时进行捕获并进行处理
        function videoSeek(e){
            if(video.paused || video.ended){
                play();
                enhanceVideoSeek(e);
            }
            else{
                enhanceVideoSeek(e);
            }

        }
        function enhanceVideoSeek(e){
            clearInterval(progressFlag);
            var length = e.pageX - progressWrap.offsetLeft;
            var percent = length / progressWrap.offsetWidth;
            playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
            video.currentTime = percent * video.duration;
            progressFlag = setInterval(getProgress, 60);
        }

    }(this, document))
</script>
</body>
</html>

```

[Video视频画中画效果实例页面](https://www.zhangxinxu.com/study/201812/video-picture-in-picture-demo.php)
张鑫旭 -- HTML5 video视频播放Picture-in-Picture画中画技术 [link](https://www.zhangxinxu.com/wordpress/2018/12/html5-video-play-picture-in-picture/)

```html 
<video id="video" src="./fish.mp4" controls playsinline loop></video>
<input type="button" id="pipBtn" value="点击进入画中画状态">

```

```style 
   video { max-width:100%; }

```

```javascript
var pipWindow;

pipBtn.addEventListener('click', function(event) {
  log('切换Picture-in-Picture模式...');
  // 禁用按钮，防止二次点击
  this.disabled = true;
  try {
    if (video !== document.pictureInPictureElement) {
      // 尝试进入画中画模式
      video.requestPictureInPicture();      
    } else {
      // 退出画中画
      document.exitPictureInPicture();
    }
  } catch(error) {
    log('&gt; 出错了！' + error);
  } finally {
    this.disabled = false;
  }
});

// 点击切换按钮可以触发画中画模式，
// 在有些浏览器中，右键也可以切换，甚至可以自动进入画中画模式
// 因此，一些与状态相关处理需要在专门的监听事件API中执行
video.addEventListener('enterpictureinpicture', function(event) {
  log('&gt; 视频已进入Picture-in-Picture模式');
  pipBtn.value = pipBtn.value.replace('进入', '退出');

  pipWindow = event.pictureInPictureWindow;
  log('&gt; 视频窗体尺寸为：'+ pipWindow.width +' x ' + pipWindow.height);
  
  // 添加resize事件，一切都是为了测试API
  pipWindow.addEventListener('resize', onPipWindowResize);
});
// 退出画中画模式时候
video.addEventListener('leavepictureinpicture', function(event) {
  log('&gt; 视频已退出Picture-in-Picture模式');
  pipBtn.value = pipBtn.value.replace('退出', '进入');
  // 移除resize事件
  pipWindow.removeEventListener('resize', onPipWindowResize);
});
// 视频窗口尺寸改变时候执行的事件
var onPipWindowResize = function (event) {
  log('&gt; 窗口尺寸改变为：'+ pipWindow.width +' x ' + pipWindow.height);
}
/* 特征检测 */
if ('pictureInPictureEnabled' in document == false) {
  log('当前浏览器不支持视频画中画。');
  togglePipButton.disabled = true;
}

```





