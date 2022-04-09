<template>
  <div class="items-container">
    <article-preview
      @click="goArticle(item._id)"
      v-for="item in articles"
      :title="item.title"
      :date="item.createdAt"
    ></article-preview>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  import { articleModel } from '../../requests/requests'
  import ArticlePreview from './ArticlePreview.vue'
  import { Article } from '../../models/article'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'ArticleItemsContainer',
    components: {
      ArticlePreview
    },
    setup() {
      const data = reactive({
        articles: [] as Array<Article>
      })
      const router = useRouter()
      onBeforeMount(async () => {
        const res = await articleModel.findAll()
        data.articles = res.data
      })
      function goArticle(articleId: string) {
        router.push(`/article/${articleId}`)
      }
      return {
        ...toRefs(data),
        goArticle
      }
    }
  })
</script>
<style scoped>
  .items-container {
    width: 100%;
    margin: 0 auto;
  }
</style>
