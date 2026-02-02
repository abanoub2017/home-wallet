<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastContainer from '@/components/common/ToastContainer.vue'
import PWAInstallPrompt from '@/components/common/PWAInstallPrompt.vue'
</script>

<template>
  <RouterView />
  <ToastContainer />
  <PWAInstallPrompt />
</template>

<style scoped></style>
