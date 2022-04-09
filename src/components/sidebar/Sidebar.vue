<template>
  <div class="sidebar">
    <!-- <img /> -->
    <p class="username">summergua</p>
    <p>飞流直下三千尺，疑是银河落九天</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  export default defineComponent({
    name: '',
    setup() {
      const data = reactive({})
      onBeforeMount(() => {
        //2.组件挂载页面之前执行----onBeforeMount
      })
      onMounted(() => {
        //3.组件挂载到页面之后执行-------onMounted
      })
      return {
        ...toRefs(data)
      }
    }
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
  }
</style>
