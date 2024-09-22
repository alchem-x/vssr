<template>
  <nav>
    <RouterLink to="/">VSSR</RouterLink>
    <RouterLink :to="'/about'">About</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="less">
nav {
  display: flex;
  gap: 1rem;
}
</style>