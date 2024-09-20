import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

export function createApp() {
    const app = createSSRApp({
        render() {
            return (
                <App/>
            )
        }
    })
    app.use(createPinia())
    return app
}

if (typeof window !== 'undefined') {
    createApp().mount('#app')
}