<template>
  <section>
    home
    <n-input />
    <button v-track:click track-params="button">click 埋点</button>
    <button v-track:exposure track-params="exposure">exposure 埋点</button>

    <n-button>n-button</n-button>
    <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br> <br>
    <br>
    <br>
    <br>
    <button v-track:exposure track-params="exposure-br">exposure 埋点</button>
  </section>
</template>
<script lang="ts">
import {defineComponent } from 'vue'
export default defineComponent({
  name : 'home' ,
  setup () {
    console.log('home setup')
  }
})
</script>