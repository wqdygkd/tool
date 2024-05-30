<template>

  <img src="@/assets/images/note.jpeg" alt="">
  <div>{{note}}</div>

  <button @click="getNext">按钮111</button>
</template>

<script setup lang="ts">
import {ref  } from 'vue'

import { getDognote } from '@/api'

console.log(2)

const note = ref<string>('她无意间吐的一口痰，我兑水喝了三年。')

async function getNext() {
  console.log(1)
  const res = await getDognote()
  note.value = res.data
}

</script>
<style scoped>
</style>
