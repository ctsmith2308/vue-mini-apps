import { createApp } from 'vue'
import App from './App.vue'
import { installRouter } from './plugins/router/index.js'

const app = createApp(App)

installRouter(app)

app.mount('#app')