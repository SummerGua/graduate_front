<template>
  <div class="top-bar">
    <div class="left-top">
      <el-icon class="center-icon" @click="showSidebar" :size="30">
        <expand />
      </el-icon>
      <el-icon class="center-icon" @click="goHome" :size="30">
        <home-filled />
      </el-icon>
      <el-icon class="center-icon" @click="goAdd" :size="30">
        <plus />
      </el-icon>
    </div>
    <div class="avator">{{ username }}</div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { Expand, HomeFilled, Plus } from '@element-plus/icons-vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  export default defineComponent({
    name: 'TopHeader',
    components: {
      Expand,
      HomeFilled,
      Plus
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      const showSidebar = () => {
        store.commit('showSidebar')
      }
      const goHome = () => {
        if (route.name === 'home') {
          ElMessage.warning('已经在首页啦')
          return
        }
        if (store.state.haveSaved === false) {
          ElMessage.warning('请先保存内容')
          return
        }
        router.push('/home')
      }
      const goAdd = () => {
        if (store.state.haveSaved === false) {
          ElMessage.warning('请先保存内容')
          return
        }
        router.push('/article/editor/null')
      }

      const username = computed(() => {
        return store.state.username
      })

      return {
        showSidebar,
        goHome,
        goAdd,
        username
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

  .left-top {
    display: flex;
    flex-direction: row;
  }

  .center-icon {
    margin: auto 10px;
  }

  .center-icon :hover {
    cursor: pointer;
    color: grey;
  }
</style>
