<template>
  <el-config-provider size="small">
    <el-container style="height: 100%">
      <el-header class="bar">
        <el-checkbox v-model="status" label="启用" />
      </el-header>
      <el-container>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="winex">
            <el-tabs>
              <el-tab-pane label="console">
                <Suspense>
                  <Console></Console>
                </Suspense>
              </el-tab-pane>
              <el-tab-pane label="医保卡">
                <Suspense>
                  <Card type="medicareCard"></Card>
                </Suspense>
              </el-tab-pane>
              <!-- <el-tab-pane label="身份证">
                <Card type="identityCard"></Card>
              </el-tab-pane> -->
              <!-- <el-tab-pane label="永居证">
                <Card type="identityCard"></Card>
              </el-tab-pane> -->
            </el-tabs>

            <el-descriptions v-if="false" class="margin-top" title="With border" :column="1" border>
              <el-descriptions-item>
                <template #label>Username</template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Telephone</div>
                </template>
                18100000000
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Place</div>
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
    <div></div>
    <main v-if="false">
      内置数据
      <el-select style="width: 200px" size="small" filterable value-key="id">
        <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
      </el-select>
      <div style="width: 800px; height: 400px" ref="jsoneditorRef"></div>

      读身份证
      <el-select style="width: 200px" size="small" filterable value-key="id">
        <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
      </el-select>
      <div style="width: 800px; height: 400px" ref="jsoneditorRef"></div>
      读永居证
      <el-select style="width: 200px" size="small" filterable value-key="id">
        <el-option v-for="item in contentArray" :key="item.raw" :label="item.date + item.name" :value="item.json" />
      </el-select>
      <div style="width: 800px; height: 400px" ref="jsoneditorRef"></div>
    </main>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import Card from './card.vue'
import Console from './console.vue'

const status = ref(false)
watch(status, (newStatus) => {
  console.log(newStatus)
  // chrome.storage.local.set({ count: newCount })

  // chrome.runtime.sendMessage({ type: 'COUNT', count: count.value })
})

const tabPosition = ref('left')

const jsoneditorRef = ref<any>(null)

let contentArray: any[] = reactive([])

onMounted(() => {})

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
