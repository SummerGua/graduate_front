<template>
  <div class="sidebar">
    <!-- <img /> -->
    <p class="username">summergua</p>
    <p>世界上只有一种真正的英雄主义，那就是看清生活的真相之后，依然热爱生活。</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Sidebar'
  })
</script>
<style scoped>
  .sidebar {
    border: 1px solid #9c9c9c;
    border-radius: 10px;
    position: absolute;
    width: 300px;
    top: -50px;
    left: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
