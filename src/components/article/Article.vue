<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <el-icon title="进入编辑" @click="edit(id)" class="edit" :size="40">
      <edit />
    </el-icon>
    <p class="content">{{ content }}</p>
  </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, toRefs, onBeforeMount } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { Edit } from '@element-plus/icons-vue'
    import { articleModel } from '../../requests/requests'
    export default defineComponent({
      // 点击主页之后显示的整个文章
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
        onBeforeMount(async () => {
          const res = await articleModel.findOne(route.params.id as string)
          data.content = res.data.content
          data.title = res.data.title
          data.id = res.data._id
        })

        const router = useRouter()
        function edit(id: string) {
          router.push(`/article/editor/${id}`)
        }
        return {
          ...toRefs(data),
          edit
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
    overflow:auto;
  }
</style>
