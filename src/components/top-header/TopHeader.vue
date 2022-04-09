<template>
  <div class="top-bar">
    <div @click="showSidebar" class="expand-icon">
      <el-icon class="expand" :size="30">
        <expand />
      </el-icon>
    </div>
    <div class="avator">summergua</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  import { Expand } from '@element-plus/icons-vue'
  import { useStore } from 'vuex'
  export default defineComponent({
    name: 'TopHeader',
    components: {
      Expand
    },
    setup() {
      const store = useStore()
      const showSidebar = () => {
        store.commit("showSidebar")
      }
      return {
        showSidebar
      }
    }
  })
</script>
<style scoped>
  .top-bar {
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #dcdfe6;
  }

  .expand-icon :hover {
    cursor: pointer;
  }

  .expand-icon {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
