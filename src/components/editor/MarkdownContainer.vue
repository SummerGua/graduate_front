<template>
  <div>
    <div class="title-top">
      <p class="title">{{ title }}</p>
      <span>渲染速度: {{ 0 }}ms</span>
      <button class="btn" @click="save">保存</button>
    </div>
    <textarea class="textarea" v-model="content" />
    <preview class="preview"></preview>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, toRefs, onBeforeMount, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { articleModel } from '../../requests/requests'
  import Preview from './Preview.vue'
  import VirtualMarkdown from '../../VirtualMarkdown'

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
      const route = useRoute()
      const vm = new VirtualMarkdown('preview')

      onBeforeMount(async () => {
        const res = await articleModel.findOne(route.params.id as string)
        data.title = res.data.title
        data.content = res.data.content
      })

      onMounted(() => {
        const timeStart = new Date().getTime()
        vm.render(data.content)
        const timeEnd = new Date().getTime()
        data.speed = timeEnd - timeStart
      })

      watch(data, (newValue, oldValue) => {
        console.log(newValue)
        const timeStart = new Date().getTime()
        vm.render(newValue.content)
        const timeEnd = new Date().getTime()
        data.speed = timeEnd - timeStart
        console.log(data.speed)
      })

      function save() {
        // 网络请求PATCH
        console.log('save')
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
  }
  .title {
    width: 750px;
    font-size: 30px;
    font-weight: 700;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .preview {
    float: right;
    width: 480px;
    height: 700px;
    border: 1px solid grey;
  }
  .btn {
    width: 80px;
    height: 35px;
    float: right;
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
