<template>
  <el-config-provider size="small">
    <el-checkbox v-model="status" label="启用" />
    <el-button type="primary" @click="importFile">
      <el-icon>
        <Upload />
      </el-icon>
    </el-button>
    <el-select style="width: 200px" size="small" @change="selectChange" filterable value-key="id">
      <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
    </el-select>

    <el-select style="width: 200px" size="small" @change="selectChange" filterable value-key="id">
      <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
    </el-select>

    <div style="width: 800px; height: 400px" ref="jsoneditorRef"></div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRaw, watch } from 'vue'
import JSONEditor from 'jsoneditor'
import type { JSONEditorOptions } from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import { Upload } from '@element-plus/icons-vue'

import * as defaultCardData from './default'
const props = defineProps<{
  type: string
}>()

const storageKey = props.type
let cardData = defaultCardData[storageKey as keyof typeof defaultCardData]
let storageData = await chrome.storage.local.get([storageKey])
console.log(1, storageData)
console.log(1, cardData)
if (!storageData[storageKey]) {
}

const status = ref(false)
watch(status, (newStatus) => {
  console.log(newStatus)
  // chrome.storage.local.set({ count: newCount })
  // chrome.runtime.sendMessage({ type: 'COUNT', count: count.value })
})

console.log(props.type)

const jsoneditorRef = ref<any>(null)
let jsoneditor: JSONEditor
let contentArray: any[] = reactive([])

function importFile() {
  let fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.style.cssText = 'position:absolute;top:-100px;left:-100px'

  fileInput.addEventListener(
    'change',
    (event) => {
      let file = (<HTMLInputElement>event.target).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const content = event.target?.result as string
          contentArray.push(
            ...content
              .split('-------------------------------------INFO-------------------------------------')
              .filter((item) => item.includes('读卡接口代理A-2出参'))
              .map((item) => {
                return { raw: item, json: extractJSON(item) }
              })
              .filter((item) => item.json && item.json.success)
              .map((item) => {
                let { personInfomation, identityCertificateInfomationList } = item.json?.data || {}
                let idCard = (identityCertificateInfomationList || []).find(
                  (info: any) => info.identityCertificateTypeConceptId === '391004456' && info.identityCertificateTypeCode === '152626'
                )?.identityCertificateNo
                let mCard = (identityCertificateInfomationList || []).find(
                  (info: any) => info.identityCertificateTypeConceptId === '399202505' && info.identityCertificateTypeCode === '152691'
                )?.identityCertificateNo
                let date = item.raw.split('读卡接口代理')[0]?.trim()
                return {
                  ...item,
                  date,
                  name: personInfomation.name,
                  idCard,
                  mCard,
                  id: date + idCard
                }
              })
          )

          if (contentArray.length === 1) {
            jsoneditor.set(toRaw(contentArray[0]))
          }
          console.log(toRaw(contentArray))
          // this.saveContentToLocal(toolName, file.name, evt.target.result);
        }
        reader.readAsText(file)
      }
    },
    false
  )

  document.body.appendChild(fileInput)
  fileInput.click()
  window.setTimeout(() => fileInput.remove(), 3000)
}

// 从字符串中提取json
function extractJSON(content: string) {
  let firstOpen
  let firstClose = content.length - 1
  let candidate
  firstClose = content.lastIndexOf('}')
  do {
    firstOpen = content.indexOf('{')
    if (firstClose <= firstOpen) return null
    do {
      candidate = content.substring(firstOpen, firstClose + 1)
      try {
        const res = JSON.parse(candidate)
        return res
      } catch {
        // console.log('...failed');
      }
      firstOpen = content.indexOf('{', firstOpen + 1)
    } while (firstClose > firstOpen && firstOpen !== -1)
    firstClose = content.lastIndexOf('}', firstClose - 1)
  } while (firstClose != -1)
  return null
}

onMounted(async () => {
  // chrome.storage.local.get([storageKey], (result) => {
  //   status.value = result[storageKey] ?? false
  // })

  const options: JSONEditorOptions = {
    mode: 'code',
    // modes: ['text', 'code', 'tree'],
    search: true,
    mainMenuBar: false,
    statusBar: false
  }
  jsoneditor = new JSONEditor(jsoneditorRef.value, options)
  const initialJson = undefined
  jsoneditor.set(initialJson)
})

function selectChange(val: object) {
  console.log(toRaw(val))
  jsoneditor.set(toRaw(val))
}

// const fileInput = ref(null)
// onMounted(() => {
//   console.log(fileInput)
// })
// fileInput.addEventListener('change', (event) => {
//   console.log(666)
//   chrome.runtime.sendMessage({ type: 'COUNT', count: 1 })
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.onload = (event) => {
//     const content = event.target.result;
//     console.log(content);
//   };
//   reader.readAsText(file);
// });
</script>
<style scoped lang="scss"></style>
