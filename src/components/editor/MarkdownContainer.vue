<template>
  <div>
    <div class="title-top">
      <div class="left-part">
        <input id="input" v-model="title" class="title" />
        <p class="analysis"> 字数：{{ content.length }} 渲染速度：{{ speed }}ms </p>
      </div>
      <button class="btn" @click="save">保存</button>
    </div>
    <textarea class="textarea" v-model="content" />
    <div id="previewer1">
      <preview class="preview"></preview>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, toRefs, onBeforeMount, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { articleModel } from '../../requests/requests'
  import Preview from './Preview.vue'
  import VirtualMarkdown from '../../VirtualMarkdown'
  import { ElMessage } from 'element-plus'
  import { useStore } from 'vuex'
  import hljs from 'highlight.js'

  export default defineComponent({
    name: 'MarkdownContainer',
    components: {
      Preview
    },
    setup() {
      const data = reactive({
        title: '',
        content: '',
        speed: 0
      })

      const store = useStore()
      const route = useRoute()
      const vm = new VirtualMarkdown('preview')

      onBeforeMount(() => {
        if (route.params.id !== 'null') {
          findOne()
        }
      })

      onMounted(() => {
        render(data.content)
        document
          .getElementById('previewer1')
          ?.querySelectorAll('pre code')
          .forEach((item) => {
            hljs.highlightElement(item as HTMLElement)
          })
      })

      watch(data, (newValue, oldValue) => {
        store.commit('changeSaveStatus', false)
        render(newValue.content)
        document
          .getElementById('previewer1')
          ?.querySelectorAll('pre code')
          .forEach((item) => {
            hljs.highlightElement(item as HTMLElement)
          })
      })

      async function findOne(): Promise<void> {
        const res = await articleModel.findOne(route.params.id as string)
        if (res.status === 200) {
          data.title = res.data.title
          data.content = res.data.content
        } else {
          ElMessage.warning('出了点问题')
        }
      }

      async function save(): Promise<void> {
        if (data.title === '' || data.content === '') {
          ElMessage.error('标题或内容不可为空哦')
          return
        }
        let res: any
        if (route.params.id === 'null') {
          res = await articleModel.createOne(
            data.title,
            data.content,
            new Date(),
            new Date(),
            localStorage.getItem('userId') as string
          )
        } else {
          res = await articleModel.modifyOne(
            route.params.id as string,
            data.title,
            data.content,
            new Date()
          )
        }
        if (res.status !== 200 && res.status !== 201) {
          ElMessage.warning('出了点问题')
          return
        }
        store.commit('changeSaveStatus', true)
        ElMessage.success('保存成功')
      }

      function render(content: string): void {
        const startTime = new Date()
        vm.render(content)
        const endTime = new Date()
        data.speed = Number(endTime) - Number(startTime)
      }

      return {
        ...toRefs(data),
        save
      }
    }
  })
</script>
<style scoped>
  .title-top {
    width: 100%;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .left-part {
    width: 750px;
  }
  .title {
    width: 100%;
    font-size: 30px;
    font-weight: 700;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .analysis {
    width: 240px;
    display: block;
  }
  .preview {
    float: right;
    width: 480px;
    height: 700px;
    border: 1px solid grey;
    overflow: scroll;
    display: inline;
  }
  .btn {
    width: 80px;
  }
  .btn:hover {
    cursor: pointer;
  }
  .textarea {
    float: left;
    width: 450px;
    height: 700px;
  }
</style>
