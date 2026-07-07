import type { App } from 'vue'
import { router } from '@/router'

function installRouter(app: App) {
  app.use(router)
}

export { installRouter }
