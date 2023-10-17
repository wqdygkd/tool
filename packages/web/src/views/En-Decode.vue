<script setup lang="ts">
  import {ref, reactive, computed, toRefs  } from 'vue'
  import type { Ref } from 'vue'

  const sourceContent = ref<string>('')
  const selectedType = ref<string>('')
  const resultContent = ref<string>('')

  // interface Type {
  //   [index: number]: [TypeItem]
  // }

  interface TypeItem {
    name: string,
    value: string
  }

  const encodeType = reactive<TypeItem[]>([
    {name: 'Unicode编码(\\u开头)', value: 'uniEncode'},
    {name: 'URL编码(%开头)', value: 'urlEncode'},
    {name: 'UTF16编码(\\x开头)', value: 'utf16Encode'},
    {name: 'Base64编码', value: 'base64Encode'},
  ])

  function convert() {
    console.log('convert')
  }

  function clear() {
    console.log('clear')
  }

  function getResult() {
    console.log('getResult')
  }

</script>

<template>
  <div class="panel-body">
    <div class="source">
      <el-input v-model="sourceContent" :rows="8" type="textarea" placeholder="粘贴需要进行转换的字符串" />
    </div>

    <div class="type">
      <el-radio-group v-model="selectedType" @change="convert()">
        <el-radio v-for="item in encodeType" :key="item.value" :label="item.value">{{item.name}}</el-radio>
      </el-radio-group>

      <br>
      <!-- <input type="button" value="清空" @click="clear()"> -->
      <!-- <input type="button" value="转换" @click="convert()"> -->
    </div>

    <div class="result" >
      <el-input v-model="resultContent" :rows="8" type="textarea" @mouseover="getResult()"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
.panel-body {
  padding: 20px;
  box-sizing: border-box;

  .source {
    width: 100%;
  }
  .result {
    width: 100%;
  }
}
</style>
