<template>
  <el-config-provider size="small">
    <el-checkbox v-model="status" label="启用" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const status = ref<boolean>()
const storageKey = 'winex.console'

const storageData = await chrome.storage.local.get([storageKey])
status.value = storageData[storageKey] ?? false

watch(status, (newStatus) => {
  chrome.storage.local.set({ [storageKey]: newStatus })
  chrome.runtime.sendMessage({ type: storageKey, value: newStatus })
})
</script>
