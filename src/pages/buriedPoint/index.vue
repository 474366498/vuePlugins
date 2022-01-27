<template>
  <n-space vertical size="large" v-track:exposure track-params="页面埋点">
    <n-layout>
      <n-layout-header>
        <h3>埋点</h3>
        <a href="https://github.com/Hugohui/vueTrackSdk">来自</a>
      </n-layout-header>
      <n-layout-content content-style="padding:24px">
        <button v-track:click track-params="button">click 埋点</button>
        <button v-track:exposure track-params="exposure">exposure 埋点</button>
        <n-button v-track:click track-params="componentButton">三方组件按钮埋点</n-button>
        <br><br>
        <n-input v-track:enter :track-params="inputValue" 
        placeholder="回车(搜索)埋点" v-model:value="inputValue" @keyup.enter.native ="e=>inputEnter(e)"/>
        <br><br>
        <div style="display:flex;align-items:center">
          <n-input v-track:enter :track-params="JSON.stringify(searchParams)" v-model:value="searchParams.name" placeholder="回车(搜索)埋点(搜索条件(类))"></n-input>
          <n-select v-model:value="searchParams.value" :options="selectData"></n-select>
          <n-date-picker v-model:value="searchParams.time" type="date" clearable></n-date-picker>
          <n-button v-track:click :track-params="searchParams" @click="e=>onGetSearchParams(e)">假搜索</n-button>
        </div>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <button v-track:exposure track-params="视图窗口 埋点">视图窗口 埋点</button>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import Vue , {defineComponent , ref , reactive } from 'vue'
export default defineComponent({
  name : 'buried-point' ,
  cname : '埋点',
  setup () {
    const inputValue = ref('')
    const inputEnter = (e:Event) => {
      console.log(25,e)
    }

    let selectData = [ {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3',
          disabled: true
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7',
          disabled: true
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }]
    const searchParams  = reactive({
      name : '' ,
      value : '' ,
      time : null
    })
    const onGetSearchParams = (e:Event)=>{
      console.log(100,e , searchParams)
    }
    return {
      inputValue ,
      inputEnter ,
      // 搜索
      selectData ,
      searchParams ,
      onGetSearchParams
    }
  }
})
</script>