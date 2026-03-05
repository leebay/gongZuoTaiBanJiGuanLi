<template>
  <div class="app-container">
    <ClassManagement />
  </div>
</template>

<script setup>
import ClassManagement from './components/ClassManagement/index.vue'
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.app-container {
  padding: 24px;
  min-height: 100vh;
  background-color: #f0f2f5;
  max-width: 80%;
  margin: 0 auto;
}
</style>
