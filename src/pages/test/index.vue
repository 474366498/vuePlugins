<template>
  <section class="flex flex-dir-c">
    <div class="flex flex-jc-sa">
      <input :value="value" @input="e=>onInputValue(e)" @change="e=>onChangeValue(e)" placeholder="防抖函数测试" />
      <button @click="e=>onDebounceCancel(e)">cancel</button>
    </div>
    <div class="flex flex-jc-sa">
       <button @click="e => onTestThrottle(e)">节流</button>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent ,ref ,reactive} from 'vue'
import {debounce , throttle} from '@/utils/base'
// console.log(10,debounce)
export default defineComponent({
  name : 'test' ,
  cname : '测试页面' ,
  setup(cont,props){
    console.log(cont,props)
    let value = ref('')
    // 普通式
    const onInputValue = debounce((e:Event) =>{
      console.log(16,e,e.target.value)
    })
    /* promise 式
    const debouncePromise = debounce(function (args){
      console.log('ff',args)
      return 'sss'
    },2000,false,(res:any)=>{
      console.log(28,res)
    })
    const onInputValue = (e:Event) =>{
      const p = debouncePromise.apply(this,e)
      console.log(33,p,e.target.value)
      p.then(res=>{
        console.log(35,res)
      }).catch(err=>{
        console.log(37,err)
      })
    }
    */
    const onChangeValue = (e)=>{
      console.log(19,e,e.target.value)
    }
    const onDebounceCancel = function () {
      onInputValue.cancel()
    }
    const onTestThrottle = throttle((e:Event)=>{
      console.log(e )
    })
    return {
      value ,
      onInputValue ,
      onChangeValue ,
      onDebounceCancel ,
      onTestThrottle
    }
  }
})
</script>


