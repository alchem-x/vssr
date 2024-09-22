import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import { router } from '@/router.js'
import { isBrowser } from '@/utils.js'

export function createApp() {
    const app = createSSRApp({
        render() {
            return (
                <App/>
            )
        }
    })
    app.use(createPinia())
    app.use(router)
    return app
}

if (isBrowser) {
    ;(async () => {
        await router.isReady()
        createApp().mount('#app')
    })()
}