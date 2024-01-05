<template>
  <el-config-provider size="small">
    <el-container style="height: 100%;">
      <el-header class="bar">
        <el-checkbox v-model="status" label="启用" />
      </el-header>
      <el-container>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="User">
            <el-tabs>
              <el-tab-pane label="医保卡">
                <Card></Card>
              </el-tab-pane>
            </el-tabs>

            <el-descriptions v-if="false" class="margin-top" title="With border" :column="1" border>
              <el-descriptions-item>
                <template #label>
                  Username
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">

                    Telephone
                  </div>
                </template>
                18100000000
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">

                    Place
                  </div>
                </template>
                Suzhou
              </el-descriptions-item>

            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>
          <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>
      </el-container>
    </el-container>
    <div>

    </div>
    <main v-if="false">

      内置数据
      <el-select style="width: 200px;" size="small" @change="change" filterable value-key="id">
        <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
      </el-select>
      <div style="width: 800px; height: 400px;" ref="jsoneditorRef"></div>

      读身份证
      <el-select style="width: 200px;" size="small" @change="change" filterable value-key="id">
        <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
      </el-select>
      <div style="width: 800px; height: 400px;" ref="jsoneditorRef"></div>
      读永居证
      <el-select style="width: 200px;" size="small" @change="change" filterable value-key="id">
        <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
      </el-select>
      <div style="width: 800px; height: 400px;" ref="jsoneditorRef"></div>
    </main>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRaw , watch} from 'vue'
import Card from './card.vue'

const status = ref(false)
watch(status, (newStatus) => {
  console.log(newStatus)
  // chrome.storage.sync.set({ count: newCount })

  // chrome.runtime.sendMessage({ type: 'COUNT', count: count.value })
})

const tabPosition = ref('left')

const jsoneditorRef = ref<any>(null)

let contentArray: any[] = reactive([])

function importFile() {
  let fileInput = document.createElement('input')
  fileInput.type = 'file';
  fileInput.style.cssText = 'position:absolute;top:-100px;left:-100px';

  fileInput.addEventListener('change', (event) => {
    let file = (<HTMLInputElement>event.target).files?.[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const content = event.target?.result as string;
        contentArray.push(...content.split('-------------------------------------INFO-------------------------------------')
                                  .filter(item => item.includes('读卡接口代理A-2出参'))
                                  .map(item => {
                                    return { raw: item, json: extractJSON(item)}
                                  })
                                  .filter(item => item.json && item.json.success)
                                  .map(item => {
                                    let { personInfomation, identityCertificateInfomationList } = item.json?.data || {}
                                    let idCard = (identityCertificateInfomationList || []).find((info: any) => info.identityCertificateTypeConceptId === '391004456' && info.identityCertificateTypeCode === '152626')?.identityCertificateNo
                                    let mCard = (identityCertificateInfomationList || []).find((info: any) => info.identityCertificateTypeConceptId === '399202505' && info.identityCertificateTypeCode === '152691')?.identityCertificateNo
                                    let date = item.raw.split('读卡接口代理')[0]?.trim()
                                    return {
                                      ...item,
                                      date,
                                      name: personInfomation.name,
                                      idCard,
                                      mCard,
                                      id: date + idCard
                                    }
                                  }))

        console.log(toRaw(contentArray))
        // this.saveContentToLocal(toolName, file.name, evt.target.result);
      };
      reader.readAsText(file);
    }
  }, false);

  document.body.appendChild(fileInput);
  fileInput.click();
  window.setTimeout(() => fileInput.remove(), 3000);
}

// 从字符串中提取json
function extractJSON (content: string) {
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

onMounted(() => {

})


function change(val) {
  console.log(val)
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



<style scoped lang="scss">
.bar {
  display: flex;
  height: 25px;
  border-bottom: 1px solid var(--el-border-color-light);
}

:deep(.el-tabs__nav-wrap) {
  &.is-left::after {
    width: 1px;
  }

  .el-tabs__item {
    justify-content: left;
    font-weight: 400;
    &.is-active {
      background-color: var(--el-color-primary-light-8);
    }
  }
}
</style>
<style>
:root {
  color-scheme: light dark;
  --el-color-primary: #1b6ef3;
  --el-color-primary-dark2: #1b6ef3;
  --el-border-color-light: #d3e3fd;


}
.el-button--primary {
  --el-button-hover-border-color: var(--el-color-primary-dark2);
  --el-button-hover-bg-color: var(--el-color-primary-dark2);
}
.el-tabs {
  --el-tabs-header-height: 30px;
}
body {
  color-scheme: light dark;
  margin: 0;
}
</style>
