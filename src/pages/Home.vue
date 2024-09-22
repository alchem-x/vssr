<template>
  <div>
    <Header/>
    <div>
      VSSR: {{ store.data }}
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store.js'
import Header from '@/components/Header.vue'
import { onMounted, onServerPrefetch, useSSRContext } from 'vue'

const store = useAppStore()
const ssrContext = useSSRContext()

// Run on server
onServerPrefetch(async () => {
  await store.fetchData()
  ssrContext.data = store.data
})

// Run on browser Vue components mounted
onMounted(async () => {
  if (!store.data) {
    await store.fetchData()
  }
})
</script>