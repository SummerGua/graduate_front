import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { key, store } from './store'
import element from './element/index'

const app = createApp(App)
app.use(router).use(store, key)
element(app)
app.mount('#app')