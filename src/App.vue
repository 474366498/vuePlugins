<template>
<router-view>
 
</router-view>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />-->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />  -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from "vue-router";
import Layout from '@/components/layout/index.vue'
import HelloWorld from './components/HelloWorld.vue'
interface DataProps {
  t1 : number ,
  t2 : number
}

export default defineComponent({
  name: 'App' ,
  data () :DataProps{
return {
  t1: 0 ,
  t2 : 0
}
  },
  setup() {
    const router = useRouter();
    console.log('setup')
    // router.push({ path: "/" });
},
created (){
  const _this = this
  window.addEventListener('beforeunload',function () {
    _this.t1 = new Date().getTime()
    console.log('beforeload',_this.t1)
  })
  window.addEventListener('onload',function () {
    _this.t2 = new Date().getTime()
    console.log('unload',_this.t2)
    debugger
  })
  console.log(this)
  // this.$off('hook:beforeDestory',function (){
  //   console.log(45,'off')
  // })
},
  components: {
    HelloWorld ,
    Layout
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
