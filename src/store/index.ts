import { createStore } from 'vuex'

export interface State {
  sidebarVisibility: boolean
  haveSaved: boolean
  isSignin: boolean
  username: string
}

export const store = createStore<State>({
  state() {
    return {
      sidebarVisibility: false,
      haveSaved: true, // 修改文章是否保存了
      isSignin: false,
      username: ''
    }
  },
  mutations: {
    showSidebar(state) {
      state.sidebarVisibility = !state.sidebarVisibility
    },
    changeSaveStatus(state, flag: boolean) {
      state.haveSaved = flag
    },
    changeSignFlag(state, flag: boolean) {
      state.isSignin = flag
    },
    setUsername(state, username: string) {
      state.username = username
    }
  }
})
