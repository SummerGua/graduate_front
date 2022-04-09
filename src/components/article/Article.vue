<template>
  <div>
    <h1 class="title"></h1>
    <p></p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  export default defineComponent({
    // 点击主页之后显示的整个文章
    name: 'Article',
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
<style scoped lang="less"></style>
