import { defineStore } from 'pinia'
import { isBrowser } from '@/utils.js'

export const useAppStore = defineStore('app', {
    state() {
        if (typeof __INIT_DATA__ !== 'undefined') {
            return {
                ...__INIT_DATA__
            }
        } else {
            return {
                data: '',
                isBrowser,
            }
        }
    },
    actions: {
        async fetchData() {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
            const r = await response.json()
            this.data = r.title
        },
    }
})