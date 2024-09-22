import { defineComponent, h, useSSRContext } from 'vue'
import { RouterView } from 'vue-router'
import { isBrowser } from '@/utils.js'
import { routes } from '@/router.js'

export default defineComponent({
    setup() {
        const ssrContext = useSSRContext()
        return {
            requestPath: ssrContext?.requestPath,
        }
    },
    render({ requestPath }) {
        if (isBrowser) {
            return h(RouterView)
        } else {
            const C = routes.find((it) => it.path === requestPath)?.component
            if (C) {
                return h(C)
            } else {
                return null
            }
        }
    },
})