<template>
  <section id="app-s" :data-theme="'theme-'+skin">
    <h1>Layout {{skin}}</h1> 
    <router-view></router-view>
    <div style="position:fixed;right:50px;top:50px;">
    <n-dropdown :options="options" placement="bottom-start" trigger='click' :on-select="onChange">
      <span>
        换肤
        <n-icon> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M256,294.1L383,167c9.4-9.4,24.6-9.4,33.9,0s9.3,24.6,0,34L273,345c-9.1,9.1-23.7,9.3-33.1,0.7L95,201.1
	c-4.7-4.7-7-10.9-7-17c0-6.1,2.3-12.3,7-17c9.4-9.4,24.6-9.4,33.9,0L256,294.1z"></path></svg></n-icon>
      </span>
     
    </n-dropdown>
    </div>
    <span>0s9.3,24.6,0,34L273,345c-9.1,9.1-23.7,9.3-33.1,0.7L95,201.1
	c-4.7-4.7-7-10.9-7-17c0-6.1,2</span>
  </section>
</template>
<script lang="ts">
import {ref} from 'vue'
import {defineComponent} from 'vue'
export default defineComponent({
  name : 'layout' ,
  data () {
    return {
      
    }
  },
  setup () {
    let skin = ref('medium')
    const options = ref([
        {label:'小',key:'small'},
        {label:'普',key:'medium'},
        {label:'大',key:'large'}
      ])
    const onChange = function (e:String) {
      console.log(32,e)
      skin.value = e
    }
    return {
      skin ,
      options ,
      onChange
    }
  }
})
</script>
<style lang="scss" scoped>
  @import '@/assets/theme/index.scss' ;
    *{
      @include theming(){
        color : themed("color");
        font-weight: themed('font-weight');
        font-size: themed('font-size');
      }
  }
</style>