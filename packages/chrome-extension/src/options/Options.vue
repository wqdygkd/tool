<script setup lang="ts">
import { ref, onMounted } from 'vue'

const countSync = ref(0)

onMounted(() => {
  chrome.storage.sync.get(['count'], (result) => {
    countSync.value = result.count ?? 0
  })

  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'COUNT') {
      countSync.value = request?.count ?? 0
    }
  })
})
</script>

<template>
  <main>
    <h3>Options Page</h3>
    <h4>Count from Popup: {{ countSync }}</h4>
  </main>
</template>

