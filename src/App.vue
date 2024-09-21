<template>
  <div class="app-container">
    App Data: {{ store.data }}
  </div>
</template>

<script setup>
import { onServerPrefetch, useSSRContext } from 'vue'
import { useAppStore } from '@/store.js'

const store = useAppStore()
const ssrContext = useSSRContext()

onServerPrefetch(async () => {
  await store.fetchData()
  ssrContext.data = store.data
})
</script>

<style scoped lang="less">
.app-container {
  font-size: 1.5rem;
}
</style>
