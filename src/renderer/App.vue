<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
const fs = require('fs')
export default {
  name: 'app',
  mounted() {
    fs.mkdir('book')
  }
}
</script>

<style lang="scss">
@import './assets/scss/index';
</style>
