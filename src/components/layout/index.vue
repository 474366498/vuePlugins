<template>
  <section>
    <h1>Layout</h1> 
    <router-view></router-view>
  </section>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name : 'layout'
})
</script>