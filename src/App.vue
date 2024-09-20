<template>
  <div>VSSR: {{ store.data }}</div>
</template>

<script setup>
import { onServerPrefetch, useSSRContext } from 'vue'
import { useStore } from '@/store.js'

const store = useStore()
const ssrContext = useSSRContext()

onServerPrefetch(async () => {
  await store.fetchData()
  ssrContext.data = store.data
})
</script>