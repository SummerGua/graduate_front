<template>
  <div class="article-preview">
    <p class="title">
      {{ title }}
    </p>
    <p class="date">{{ date }}</p>
  </div>
</template>

<script lang="ts">
  // 首页上的一条标题+日期
  import { defineComponent } from 'vue'

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
  .article-preview :hover {
    cursor: pointer;
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
