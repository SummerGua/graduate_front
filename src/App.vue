<template>
  <div class="page">
    <top-header></top-header>

    <sidebar :class="sidebarShow ? 'sidebarShow' : 'sidebarHide'"></sidebar>

    <div id="view-container">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount } from 'vue'
  import TopHeader from './components/top-header/TopHeader.vue'
  import About from './components/About.vue'
  import Sidebar from './components/sidebar/Sidebar.vue'
  import { computed, ComputedRef } from '@vue/reactivity'
  import { useStore } from 'vuex'
  export default defineComponent({
    components: {
      TopHeader,
      About,
      Sidebar
    },
    setup() {
      const store = useStore()
      let sidebarShow: ComputedRef<boolean> = computed(() => {
        return store.state.sidebarVisibility
      })

      onBeforeMount(() => {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        if (token) {
          store.commit('changeSignFlag', true)
          store.commit('setUsername', username)
        }
      })

      return {
        sidebarShow
      }
    }
  })
</script>
<style>
  body,
  p {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: black;
  }
  #view-container {
    max-width: 950px;
    margin: 0 auto;
  }
  .sidebarShow {
    transform: translateY(120px);
    transition: transform 0.35s ease-in-out;
    -webkit-transition: -webkit-transform 0.35s ease-in-out;
  }
  .sidebarHide {
    transform: translateY(-120px);
    transition: transform 0.35s ease-in-out;
    -webkit-transition: -webkit-transform 0.35s ease-in-out;
  }
</style>
