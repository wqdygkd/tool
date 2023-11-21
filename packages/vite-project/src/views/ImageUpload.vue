<script setup lang="ts">
  import {ref, reactive, computed, toRefs  } from 'vue'
  import type { Ref } from 'vue'

  import { UploadFilled } from '@element-plus/icons-vue'
  import { uploadOSS } from '@/utils/ali-oss.js'

  async function  upload(file: UploadFile) {
    console.log(file)
    const res = await uploadOSS(file)
    console.log(res)
  }
</script>

<template>
  <el-upload
    class="upload-demo"
    drag
    action=""
    multiple
    :http-request="upload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
