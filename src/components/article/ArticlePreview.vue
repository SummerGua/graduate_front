<template>
  <div class="article-preview">
    <p class="title">
      <router-link to="about">{{ title }}</router-link>
    </p>
    <p class="date">{{ date }}</p>
  </div>
</template>

<script lang="ts">
  // 首页上的预览条目
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  export default defineComponent({
    name: 'ArticlePreview',
    props: {
      title: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    },
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
  .article-preview {
    border-bottom: 1px solid rgb(195, 192, 192);
    margin: 10px;
    height: 84px;
    position: relative;
  }
  .title {
    font-size: 30px;
    font-weight: bold;
  }
  .date {
    color: #9c9c9c;
    position: absolute;
    bottom: 0;
  }
</style>
