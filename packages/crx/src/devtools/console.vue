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

chrome.runtime.onMessage.addListener((request) => {
  console.log('request', request)
  if (request.type === 'winex.console' && status.value) {
    injectConsole(1)
  }
})

watch(status, (newStatus) => {
  console.log('watch')
  chrome.storage.local.set({ [storageKey]: newStatus })
  // chrome.runtime.sendMessage({ type: storageKey, value: newStatus })
  if (newStatus) {
    injectConsole(2)
  }
})

function injectConsole(type: number): void {
  // type 1 页面刷新  2 页面已存在
  console.log('injectConsole', type)
  let inspectStr: string = ''
  if (type === 1) {
    // 禁止 console 被修改
    inspectStr = `Object.defineProperty(window.console, 'log', { writable: false, configurable:false })`
  } else if (type === 2) {
    // 恢复默认console
    inspectStr = `const iframe = document.createElement('iframe');
                  iframe.style.width = '0';
                  iframe.style.height = '0';
                  iframe.style.border = 'none';
                  iframe.style.display = 'block';
                  document.body.append(iframe);
                  window.console = iframe.contentWindow.console;`
  }

    chrome.devtools.inspectedWindow.eval(inspectStr,
      function(result, isException) {
        if (isException) {
          console.log('injectConsole isException', type, isException)
        } else {
          console.log('injectConsole result', type, result)
        }
      }
    )
}
</script>
