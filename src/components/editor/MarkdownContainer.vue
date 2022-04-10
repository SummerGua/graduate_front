<template>
  <div>
    <textarea v-model="content" />
    <preview class="preview"></preview>
    <button @click="save">保存</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, toRefs, onBeforeMount, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { articleModel } from '../../requests/requests'
  import Preview from './Preview.vue'
  import Markdown365Parser from 'markdown365-parser'
  export default defineComponent({
    name: 'MarkdownContainer',
    components: {
      Preview
    },
    setup() {
      const data = reactive({
        content: ''
      })
      let parser = ref(undefined as any)
      const route = useRoute()
      onBeforeMount(async () => {
        const res = await articleModel.findOne(route.params.id as string)
        data.content = res.data.content
      })

      onMounted(() => {
        parser = new Markdown365Parser({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        smartypants: false,
        base: '',
        $el: document.querySelector('#preview') // 一定要在mounted
      })
      })
      
      watch(data, (newValue, oldValue) => {
        parser.parse(newValue.content)
      })

      function save() { // 网络请求PATCH
        console.log("save")
      }

      return {
        ...toRefs(data),
        save
      }
    }
  })
</script>
<style scoped>
  .editor,
  .preview {
    max-width: 450px;
  }
  .editor {
    float: left;
  }
</style>
