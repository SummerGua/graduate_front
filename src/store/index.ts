import { createStore } from 'vuex'

export interface State {
  sidebarVisibility: boolean
}

export const store = createStore<State>({
  state() {
    return {
      sidebarVisibility: false
    }
  },
  mutations: {
    showSidebar(state) {
      state.sidebarVisibility = !state.sidebarVisibility
    }
  }
})
