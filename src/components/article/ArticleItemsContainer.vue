<template>
  <div class="items-container">
    <article-preview
      @click="goArticle(item._id)"
      v-for="item in articles"
      :title="item.title"
      :date="item.updatedAt || item.createdAt"
    ></article-preview>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  import { articleModel } from '../../requests/requests'
  import ArticlePreview from './ArticlePreview.vue'
  import { Article } from '../../models/article'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import moment from 'moment'

  export default defineComponent({
    // 首页的条目区
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
        if (res.status !== 200) {
          ElMessage.warning('出现了一些问题')
          return
        }
        data.articles = res.data
        data.articles.forEach((item) => {
          item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
          item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        })
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
