<template>
  <div class="items-container">
    <article-preview v-for="item in articles" title="Title" date="2020-4-6"></article-preview>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  import { articleModel } from '../../requests/requests'
  import ArticlePreview from './ArticlePreview.vue'
  import { Article } from '../../models/article'
  export default defineComponent({
    name: 'ArticleItemsContainer',
    components: {
      ArticlePreview
    },
    setup() {
      const data = reactive({
        articles: [] as Article[]
      })
      onBeforeMount(async () => {
        const res = await articleModel.findAll()
        data.articles = res.data
      })
      return {
        ...toRefs(data)
      }
    }
  })
</script>
<style scoped>
  .items-container {
    max-width: 750px;
    margin: 0 auto;
  }
</style>
