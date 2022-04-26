<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <el-icon title="进入编辑" @click="toEdit(id)" class="edit" :size="40">
      <edit />
    </el-icon>
    <div id="previewer">
      <p class="content" id="preview"></p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onBeforeMount } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { articleModel } from '../../requests/requests'
  import { Edit } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  import VirtualMarkdown from '../../VirtualMarkdown'
  import hljs from 'highlight.js'

  export default defineComponent({
    // 点击主页的文章之后的预览
    name: 'Article',
    components: {
      Edit
    },
    setup() {
      const data = reactive({
        title: 'loading',
        content: 'loading',
        id: ''
      })
      const route = useRoute()
      const vm = new VirtualMarkdown('preview')

      onBeforeMount(async () => {
        const res = await articleModel.findOne(route.params.id as string)
        if (res.status !== 200) {
          ElMessage.warning('出了点问题')
          return
        }
        data.content = res.data.content
        data.title = res.data.title
        data.id = res.data._id
        vm.render(data.content)
        document
          .getElementById('previewer')
          ?.querySelectorAll('pre code')
          .forEach((item) => {
            hljs.highlightElement(item as HTMLElement)
          })
      })

      const router = useRouter()
      function toEdit(id: string) {
        router.push(`/article/editor/${id}`)
      }
      return {
        ...toRefs(data),
        toEdit
      }
    }
  })
</script>
<style scoped>
  .edit {
    float: right;
  }
  .edit :hover {
    cursor: pointer;
  }
  .content {
    min-height: 100px;
    overflow: auto;
  }
</style>
