<script setup lang="ts">
import {ref, reactive, computed, toRefs  } from 'vue'

interface User {
  name: string
  age: string | number
}

// ref() 创将传入参数的值包装为一个带 .value 属性的 ref 对象
// ref定义的变量，改变值要.value, 而且在template中不用写.value
// 参数可以是基本类型，也可以是引用类型
const name = ref<string>('张三')
const age = ref<string | number>(18)

// reactive() 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效
const user:User = reactive({
  name:"前端开发爱好者",
  age:'20'
})

const user2 = computed<User>(() => {
  return {
    name: name.value,
    age: user.age
  }
})

const user3 = computed<User>({
  get ()  {
    return {
      name: user.name,
      age: age.value
    }
  },
  set(val: User) {
    name.value = val.name
    age.value = val.age
  }
})

</script>

<template>
  <main>
    {{user.name}}
  </main>

  <button @click="change">按钮</button>
</template>
