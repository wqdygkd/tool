<template>
  <el-config-provider size="small">
    <el-checkbox v-model="status" label="启用" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const status = ref<boolean>()
const storageKey = 'winex.console'

chrome.runtime.onMessage.addListener(async (request) => {
  const storageData = await chrome.storage.local.get([storageKey])
  status.value = storageData[storageKey] ?? false

  console.log('request', request)
  if (request.type === 'winex.console') {
    console.log(status.value)
    injectConsole(status.value ? 1 : 2)
  }
})

watch(status, (newStatus) => {
  console.log('watch')
  chrome.storage.local.set({ [storageKey]: newStatus })
  // chrome.runtime.sendMessage({ type: storageKey, value: newStatus })
  injectConsole(newStatus ? 3 : 4)
})

async function injectConsole(type: number): Promise<void> {
  // type 1 页面刷新 true 2 页面刷新 false  3 页面已存在
  if (type === 1 || type === 2) {
    await chrome.devtools.inspectedWindow.eval(
      `
      window.realLog = window.console.log;
      window.fakeLog;
      Object.defineProperty(window.console, 'log', {
        get() {
          return window.fakeLog || window.realLog;
        },
        set(v) {
          window.fakeLog = v;
          console.info(v);
          console.info(typeof v);
        }
      })
      `
    )
  }

  // if (type === 1 || type === 3) {
  //   await chrome.devtools.inspectedWindow.eval(
  //     `
  //     Object.defineProperty(window.console, 'log', {
  //       get() {
  //         return window.realLog
  //       },
  //       set(v) {
  //         // window.fakeLog = v
  //       }
  //     })
  //     `
  //   )
  // }

  if (type === 4) {
    await chrome.devtools.inspectedWindow.eval(
      `
      Object.defineProperty(window.console, 'log', {
        get() {
          return window.fakeLog
        },
        set(v) {}
      })
      `
    )
  }

  console.log('injectConsole', type)
  return
  // 注入真实console
  // chrome.devtools.inspectedWindow.eval(`
  //   if (!window.realconsole) {
  //     const iframe = document.createElement('iframe');
  //     iframe.style.width = '0';
  //     iframe.style.height = '0';
  //     iframe.style.border = 'none';
  //     iframe.style.display = 'block';
  //     document.body.append(iframe);
  //     window.realconsole = iframe.contentWindow.console;
  //   }
  //   `)



  let res = chrome.devtools.inspectedWindow.eval(``)

  chrome.devtools.inspectedWindow.eval(`
    const iframe = document.createElement('iframe');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    document.body.append(iframe);
    window.realconsole = iframe.contentWindow.console;
    `,
    function(result, isException) {
      if (isException) {
        console.log('injectConsole isException', type, isException)
      } else {
        console.log('injectConsole result', type, result)
      }
    }
  )

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
